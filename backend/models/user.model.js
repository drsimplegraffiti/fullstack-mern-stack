const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already in use'],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    gender: {
      type: String,
      required: [true, 'Please select your gender'],
      enum: ['Male', 'Female'],
      default: 'Male',
    },
    bio: {
      type: String,
    },
    age: {
      type: Number,
      required: false,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    dob: {
      type: String,
    },
    profilePic: {
      type: String,
      default:
        'https://res.cloudinary.com/drsimple/image/upload/v1666795253/kpjowf2wagt0grs0rcev.png',
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    medicalCondition: {
      type: String,
      enum: [
        'Diabetes',
        'Asthma',
        'Others',
        'Broken bones',
        'Chest pains',
        'High Blood Pressure',
        'Heart Disease',
        'Others',
        'Cancer',
        'None',
      ],
      default: 'None',
    },
    membership: {
      type: String,
      enum: ['1 month', '3 months', '6 months', '1 year'],
      default: '1 month',
    },
  },
  {
    timestamps: true,
  }
);





// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  gender,
  bio,
  medicalCondition,
  membership,
  firstName,
  lastName
) {
  console.log({
    email,
    password,
    gender,
    bio,
    medicalCondition,
    membership,
    firstName,
    lastName,
  });
  if (
    !email ||
    !password ||
    !gender ||
    !bio ||
    !medicalCondition ||
    !membership ||
    !firstName ||
    !lastName
  ) {
    throw Error('All fields muts be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    gender,
    bio,
    medicalCondition,
    membership,
    firstName,
    lastName,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields muts be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect Email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
