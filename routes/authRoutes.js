import express from 'express';
import { register, login, getProfile, deleteAllUsers } from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.delete('/', deleteAllUsers);


export default router;
