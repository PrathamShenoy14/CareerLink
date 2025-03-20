import express from "express";
import { register, login, googleLogin, logout } from "../controllers/authController.js";
import upload from "../middlewares/multerMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadUserReport, deleteUserReport } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/logout", authMiddleware, logout);
router.get("/check-auth", authMiddleware, (req, res) => {
    res.json({ isAuthenticated: true });
});

router.post("/upload-report", authMiddleware, upload.single("pdf"), uploadUserReport);
router.delete("/delete-report", authMiddleware, deleteUserReport);

export default router;
