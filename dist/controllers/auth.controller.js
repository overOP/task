"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_model_1 = __importDefault(require("../database/models/user.model"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
class AuthController {
    static async requestResetPassword(req, res) {
        const { email } = req.body;
        const user = await user_model_1.default.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        const hashedToken = crypto_1.default
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        user.resetToken = hashedToken;
        user.resetTokenExpires = new Date(Date.now() +
            Number(process.env.RESET_TOKEN_EXPIRES_MIN) * 60 * 1000);
        await user.save();
        const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
        const templatePath = path_1.default.join(process.cwd(), "templates", "reset-password.ejs");
        const html = await ejs_1.default.renderFile(templatePath, {
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
    static async resetPassword(req, res) {
        const { token, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const hashedToken = crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
        const user = await user_model_1.default.findOne({
            where: {
                resetToken: hashedToken,
                resetTokenExpires: { [sequelize_1.Op.gt]: new Date() },
            },
        });
        if (!user)
            return res.status(400).json({ message: "Invalid or expired token" });
        user.password = await bcrypt_1.default.hash(newPassword, Number(process.env.BCRYPT_SALT_ROUNDS));
        user.resetToken = null;
        user.resetTokenExpires = null;
        user.refreshToken = null; // logout all sessions
        await user.save();
        res.json({ message: "Password reset successful" });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map