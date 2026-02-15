import { Model } from "sequelize-typescript";
declare class User extends Model {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    refreshToken?: string | null;
    resetToken?: string | null;
    resetTokenExpires?: Date | null;
}
export default User;
//# sourceMappingURL=user.model.d.ts.map