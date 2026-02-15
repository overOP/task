"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./configs/app");
const connection_1 = require("./database/connection");
const PORT = process.env.PORT || 5050;
async function start() {
    await (0, connection_1.connectToDatabase)();
    const appInstance = new app_1.App();
    appInstance.app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}
start();
//# sourceMappingURL=server.js.map