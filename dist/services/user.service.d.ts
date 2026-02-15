import User from "../database/models/user.model";
export declare class UserService {
    private tokenService;
    signup(name: string, email: string, password: string): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }>;
    signin(email: string, password: string): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: number): Promise<void>;
    private generateTokens;
}
//# sourceMappingURL=user.service.d.ts.map