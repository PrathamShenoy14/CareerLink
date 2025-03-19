import express from "express";
import { register, login, googleLogin, logout } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/logout", authMiddleware, logout);
router.get("/check-auth", authMiddleware, (req, res) => {
    res.json({ isAuthenticated: true });
});

export default router;
