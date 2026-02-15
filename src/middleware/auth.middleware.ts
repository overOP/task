import { Request, Response, NextFunction } from "express";
import { TokenService } from "../functions/token";
import User from "../database/models/user.model";
import { accessCookieOptions } from "../utils/cookieOptions";

const tokenService = new TokenService();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Please login" });
  }

  try {
    if (accessToken) {
      const payload: any = tokenService.verifyAccessToken(accessToken);
      (req as any).user = payload;
      return next();
    }

    if (refreshToken) {
      const payload: any = tokenService.verifyRefreshToken(refreshToken);
      const user = await User.findByPk(payload.id);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(401).json({
          message: "Session expired, please login",
        });
      }

      const newAccessToken = tokenService.signAccessToken({
        id: user.id,
        role: user.role,
      });

      res.cookie("accessToken", newAccessToken, accessCookieOptions);

      (req as any).user = { id: user.id, role: user.role };
      return next();
    }
  } catch {
    return res.status(401).json({
      message: "Session expired, please login",
    });
  }
};