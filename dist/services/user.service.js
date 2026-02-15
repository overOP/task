"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../database/models/user.model"));
const token_1 = require("../functions/token");
class UserService {
    tokenService = new token_1.TokenService();
    async signup(name, email, password) {
        const hashedPassword = await bcrypt_1.default.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
        const user = await user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        return this.generateTokens(user);
    }
    async signin(email, password) {
        const user = await user_model_1.default.findOne({ where: { email } });
        if (!user)
            throw new Error("Invalid credentials");
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Invalid credentials");
        return this.generateTokens(user);
    }
    async logout(userId) {
        const user = await user_model_1.default.findByPk(userId);
        if (!user)
            throw new Error("User not found");
        user.refreshToken = null;
        await user.save();
    }
    async generateTokens(user) {
        const accessToken = this.tokenService.signAccessToken({
            id: user.id,
            role: user.role,
        });
        const refreshToken = this.tokenService.signRefreshToken({
            id: user.id,
            role: user.role,
        });
        user.refreshToken = refreshToken;
        await user.save();
        return { user, accessToken, refreshToken };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map