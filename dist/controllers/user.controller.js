"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const user_model_1 = __importDefault(require("../database/models/user.model"));
class UserController {
    static userService = new user_service_1.UserService();
    static async signup(req, res) {
        try {
            const { name, email, password } = req.body;
            const { user, accessToken, refreshToken } = await UserController.userService.signup(name, email, password);
            res.cookie("accessToken", accessToken);
            res.cookie("refreshToken", refreshToken);
            res.json({ message: "Signup successful", user });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async signin(req, res) {
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken } = await UserController.userService.signin(email, password);
            res.cookie("accessToken", accessToken);
            res.cookie("refreshToken", refreshToken);
            res.json({ message: "Signin successful", user });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async profile(req, res) {
        const userId = req.user.id;
        const user = await user_model_1.default.findByPk(userId, {
            attributes: { exclude: ["password", "refreshToken"] },
        });
        res.json({ user });
    }
    static async logout(req, res) {
        const userId = req.user.id;
        await UserController.userService.logout(userId);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ message: "Logout successful" });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map