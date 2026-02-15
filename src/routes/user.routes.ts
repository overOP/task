import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);

router.get("/profile", authenticate, UserController.profile);
router.post("/logout", authenticate, UserController.logout);

router.post("/reset-password-request", AuthController.requestResetPassword);
router.post("/reset-password", AuthController.resetPassword);

export default router;