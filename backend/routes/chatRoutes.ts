import express from 'express';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, accessChat);
