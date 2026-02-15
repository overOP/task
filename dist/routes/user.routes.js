"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/signup", user_controller_1.UserController.signup);
router.post("/signin", user_controller_1.UserController.signin);
router.get("/profile", auth_middleware_1.authenticate, user_controller_1.UserController.profile);
router.post("/logout", auth_middleware_1.authenticate, user_controller_1.UserController.logout);
router.post("/reset-password-request", auth_controller_1.AuthController.requestResetPassword);
router.post("/reset-password", auth_controller_1.AuthController.resetPassword);
exports.default = router;
//# sourceMappingURL=user.routes.js.map