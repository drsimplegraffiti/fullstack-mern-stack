const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../utils/image.upload');

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
  const { email, password, gender, bio } = req.body;
  try {
    const user = await User.signup(email, password, gender, bio);
    const token = createToken(user._id);
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

 if(!bio || !dob || !age || !phone || !address ){
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
    user.profilePic = result.secure_url || "https://res.cloudinary.com/drsimple/image/upload/v1666795253/kpjowf2wagt0grs0rcev.png"

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};
