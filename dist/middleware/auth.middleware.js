"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const token_1 = require("../functions/token");
const user_model_1 = __importDefault(require("../database/models/user.model"));
const cookieOptions_1 = require("../utils/cookieOptions");
const tokenService = new token_1.TokenService();
const authenticate = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken && !refreshToken) {
        return res.status(401).json({ message: "Please login" });
    }
    try {
        if (accessToken) {
            const payload = tokenService.verifyAccessToken(accessToken);
            req.user = payload;
            return next();
        }
        if (refreshToken) {
            const payload = tokenService.verifyRefreshToken(refreshToken);
            const user = await user_model_1.default.findByPk(payload.id);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(401).json({
                    message: "Session expired, please login",
                });
            }
            const newAccessToken = tokenService.signAccessToken({
                id: user.id,
                role: user.role,
            });
            res.cookie("accessToken", newAccessToken, cookieOptions_1.accessCookieOptions);
            req.user = { id: user.id, role: user.role };
            return next();
        }
    }
    catch {
        return res.status(401).json({
            message: "Session expired, please login",
        });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map