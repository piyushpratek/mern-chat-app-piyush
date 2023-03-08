import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  registerUser,
  authUser,
  allUsers,
} from '../controllers/userControllers';

const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);

export default router;
