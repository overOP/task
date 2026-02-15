"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    logging: false,
    models: [__dirname + "/models"],
});
const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully.");
    }
    catch (err) {
        console.error("❌ Unable to connect to the database:", err);
        throw err;
    }
    try {
        await sequelize.sync({ force: false });
        console.log("✅ All models were synchronized successfully.");
    }
    catch (err) {
        console.error("❌ An error occurred while synchronizing the models:", err);
        throw err;
    }
};
exports.connectToDatabase = connectToDatabase;
exports.default = sequelize;
//# sourceMappingURL=connection.js.map