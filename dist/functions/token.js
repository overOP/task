"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    accessSecret;
    refreshSecret;
    constructor() {
        if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
            throw new Error("JWT secrets missing");
        }
        this.accessSecret = process.env.ACCESS_TOKEN_SECRET;
        this.refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    }
    signAccessToken(payload) {
        const options = {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        };
        return jsonwebtoken_1.default.sign(payload, this.accessSecret, options);
    }
    signRefreshToken(payload) {
        const options = {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        };
        return jsonwebtoken_1.default.sign(payload, this.refreshSecret, options);
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.accessSecret);
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this.refreshSecret);
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.js.map