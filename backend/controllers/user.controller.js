const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../utils/image.upload');
const sendEmail = require('../utils/email');
const bcrypt = require('bcrypt');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: '3d',
  });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    return res.status(201).json({ email, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};
exports.userSignup = async (req, res) => {
  const {
    email,
    password,
    gender,
    bio,
    medicalCondition,
    membership,
    firstName,
    lastName,
  } = req.body;
  try {
    const user = await User.signup(
      email,
      password,
      gender,
      bio,
      medicalCondition,
      membership,
      firstName,
      lastName
    );
    const token = createToken(user._id);

    //  send welcome message
    const message = `
      <h1>Welcome to the Family</h1>
      <p>Thank you for joining us. We hope you have a great time.</p>
      <p>Regards, <br> Team Fitness</p>
    `;
    await sendEmail({
      email: user.email,
      subject: 'Welcome to Fitness',
      html: message,
    });

    return res.status(201).json({ email, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.userProfile = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.editProfile = async (req, res) => {
  const { _id } = req.user;
  try {
    const { bio, dob, age, phone, address, profilePic } = req.body;

    if (!bio || !dob || !age || !phone || !address) {
      return res.status(400).json({
        error: 'All fields must be filled',
        message: 'All fields must be filled',
      });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const result = await cloudinary.uploader.upload(req.file?.path);

    user.bio = bio;
    user.dob = dob;
    user.age = age;
    user.phone = phone;
    user.address = address;
    user.profilePic =
      result.secure_url ||
      'https://res.cloudinary.com/drsimple/image/upload/v1666795253/kpjowf2wagt0grs0rcev.png';

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const resetToken = await jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: '10m',
    });

    user.resetPasswordToken = resetToken;

    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
 <a href=${resetUrl} clicktracking=off>${resetUrl}</a> 
    `;
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset request',
        html: message,
      });

      return res.status(200).json({
        message: 'Email sent',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(
      { _Id: req.user._id },
      {
        password: hashPassword,
      }
    );

    return res.status(200).json({
      message: 'Password reset successful',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.googleSignIn = async (req, res) => {
  const { tokenId } = req.body;
  try {
    // verify Token Id
    const client = new OAuth2(process.env.G_CLIENT_ID);
    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.G_CLIENT_ID,
    });

    const { email_verified, email, name, picture } = verify.payload;

    if (!email_verified) {
      return res.status(400).json({
        error: 'Email verification failed',
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      const token = createToken(user._id);
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      //  send welcome message
      const message = `
    <h1>Welcome to the Family</h1>
    <p>Thank you for joining us. We hope you have a great time.</p>
    <p>Regards, <br> Team Fitness</p>
  `;
      await sendEmail({
        email: user.email,
        subject: 'Welcome to Fitness',
        html: message,
      });
      return res.status(200).json({ email, token });
    } else {
      const password = email + process.env.SECRET;
      const newUser = await User.signup(
        email,
        password,
        firstName,
        lastName,
        bio,
        medicalCondition,
        membership
      );

      const token = createToken(newUser._id);

      return res.status(201).json({ email, token });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};
