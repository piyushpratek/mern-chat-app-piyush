import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  registerUser,
  authUser,
  allUsers,
} from '../controllers/userControllers';

const router = express.Router();

router.post('/', registerUser);
router.get('/', protect, allUsers);
router.post('/login', authUser);

export default router;
