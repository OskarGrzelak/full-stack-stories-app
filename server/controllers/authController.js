const { promisify } = require('util')
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

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })

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
    console.log('LOGIN', password)

    if (!email || !password) {
      throw new Error('Please provide email and password')
    }

    const user = await User.findOne({ email }).select('+password')
    console.log(user)

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('Incorrect email or password')
    }

    token = signToken(user._id)
    console.log(token)

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })

    res.status(200).json({
      status: 'success',
      token,
      user,
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt')

    res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.loggedUser = async (req, res, next) => {
  console.log('getting logged user')
  try {
    let user = null
    let token
    if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
      token = req.headers.cookie.split('=')[1]
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
      user = await User.findById(decoded.id)
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.protect = async (req, res, next) => {
  try {
    let token
    if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
      token = req.headers.cookie.split('=')[1]
    }
    if (!token) {
      throw new Error('You are not logged in')
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const freshUser = await User.findById(decoded.id)
    if (!freshUser) {
      throw new Error('The user belonging to the token no longer exists')
    }

    if (freshUser.changedPasswordAfter(decoded.iat)) {
      throw new Error('User recently changed password. Please log in again')
    }
    req.user = freshUser
    next()
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}
