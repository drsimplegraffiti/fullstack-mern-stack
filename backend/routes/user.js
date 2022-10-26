const express = require('express');
const {
  userLogin,
  userSignup,
  userProfile,
  editProfile,
} = require('../controllers/user.controller');
const requireAuth = require('../middleware/requireAuth');
const { upload } = require('../utils/image.upload');

const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.get('/profile', requireAuth, userProfile);
router.post('/edit', upload.single('image'), requireAuth, editProfile);

module.exports = router;
