import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({ tableName: "users", timestamps: true })
class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Default("user")
  @Column({ type: DataType.ENUM("user", "admin") })
  declare role: "user" | "admin";

  @Column({ type: DataType.STRING, allowNull: true })
  declare refreshToken?: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare resetToken?: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare resetTokenExpires?: Date | null;
}

export default User;
