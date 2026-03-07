import { Request, Response } from "express";
import User from "../database/models/user.model";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export class AuthController {
  static async requestResetPassword(req: Request, res: Response) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpires = new Date(
      Date.now() +
        Number(process.env.RESET_TOKEN_EXPIRES_MIN) * 60 * 1000
    );

    await user.save();

    const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    const templatePath = path.join(
      process.cwd(),
      "templates",
      "reset-password.ejs"
    );

    const html = await ejs.renderFile(templatePath, {
      name: user.name,
      resetUrl,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html,
    });

    res.json({ message: "Reset email sent successfully" });
  }

  static async resetPassword(req: Request, res: Response) {
    const { token, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      where: {
        resetToken: hashedToken,
        resetTokenExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(
      newPassword,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );

    user.resetToken = null;
    user.resetTokenExpires = null;
    user.refreshToken = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  }
}