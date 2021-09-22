const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })

    const token = signToken(newUser._id)

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new Error('Please provide email and password')
    }

    const user = await User.findOne({ email }).select('+password')
    console.log(user)

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('Incorrect email or password')
    }

    token = signToken(user._id)

    res.status(200).json({
      status: 'success',
      token,
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}
