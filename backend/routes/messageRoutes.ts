import express from 'express';
import { allMessage, sendMessage } from '../controllers/messageControllers';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, allMessage);

export default router;
