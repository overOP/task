"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
class App {
    app = (0, express_1.default)();
    constructor() {
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:5173",
            credentials: true,
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json());
    }
    initializeRoutes() {
        this.app.use("/api/users", user_routes_1.default);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map