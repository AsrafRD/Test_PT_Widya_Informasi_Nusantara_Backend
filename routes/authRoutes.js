import express from "express";
import { login, register, logout, profile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authMiddleware, profile);

export default router
