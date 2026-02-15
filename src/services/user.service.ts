import bcrypt from "bcrypt";
import User from "../database/models/user.model";
import { TokenService } from "../functions/token";

export class UserService {
  private tokenService = new TokenService();

  async signup(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.generateTokens(user);
  }

  async signin(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return this.generateTokens(user);
  }

  async logout(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    user.refreshToken = null;
    await user.save();
  }

  private async generateTokens(user: User) {
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