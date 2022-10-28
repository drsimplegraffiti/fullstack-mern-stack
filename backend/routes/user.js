const express = require('express');
const {
  userLogin,
  userSignup,
  userProfile,
  editProfile,
  forgotPassword,
  resetPassword,
  googleSignIn,
} = require('../controllers/user.controller');
const requireAuth = require('../middleware/requireAuth');
const { upload } = require('../utils/image.upload');


const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.get('/profile', requireAuth, userProfile);
router.post('/edit', upload.single('image'), requireAuth, editProfile);

router.post('/forgot-password', forgotPassword);

// reset password
router.post('/reset-password', requireAuth, resetPassword);

router.get('/google-login', googleSignIn);

module.exports = router;
