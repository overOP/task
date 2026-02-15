import jwt, { SignOptions } from "jsonwebtoken";

export class TokenService {
  private accessSecret: jwt.Secret;
  private refreshSecret: jwt.Secret;

  constructor() {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      throw new Error("JWT secrets missing");
    }

    this.accessSecret = process.env.ACCESS_TOKEN_SECRET as jwt.Secret;
    this.refreshSecret = process.env.REFRESH_TOKEN_SECRET as jwt.Secret;
  }

  signAccessToken(payload: object): string {
    const options: SignOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, this.accessSecret, options);
  }

  signRefreshToken(payload: object): string {
    const options: SignOptions = {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, this.refreshSecret, options);
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.accessSecret);
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, this.refreshSecret);
  }
}