import express from 'express';
const { registerUser } = require('../controllers/userControllers');

const router = express.Router();

router.route('/').post(registerUser);
// router.post("/login",authUser)

module.exports = router;
