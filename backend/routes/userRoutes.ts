import express from 'express';
import { protect } from '../middleware/authMiddleware';
const {
  registerUser,
  authUser,
  allUsers,
} = require('../controllers/userControllers');

const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);

module.exports = router;
