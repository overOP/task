import jwt from "jsonwebtoken";
export declare class TokenService {
    private accessSecret;
    private refreshSecret;
    constructor();
    signAccessToken(payload: object): string;
    signRefreshToken(payload: object): string;
    verifyAccessToken(token: string): string | jwt.JwtPayload;
    verifyRefreshToken(token: string): string | jwt.JwtPayload;
}
//# sourceMappingURL=token.d.ts.map