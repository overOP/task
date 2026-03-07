import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import User from "../database/models/user.model";

export class UserController {
  private static userService = new UserService();

  static async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const { user, accessToken, refreshToken } =
        await UserController.userService.signup(name, email, password);

      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);
    

      res.json({ message: "Signup successful", user });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, accessToken, refreshToken } =
        await UserController.userService.signin(email, password);

      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);

      res.json({ message: "Signin successful", user });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async profile(req: Request, res: Response) {
    const userId = (req as any).user.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password", "refreshToken"] },
    });

    res.json({ user });
  }

static async logout(req: Request, res: Response) {
  const userId = (req as any).user.id;

  await UserController.userService.logout(userId);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({ message: "Logout successful" });
}
}