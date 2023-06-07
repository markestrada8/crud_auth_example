const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  })
}

const getUser = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  })
})

const addUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  //VALIDATION
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Please fill out all fields')
  }

  const existingUser = await User.findOne({ email: email })
  if (existingUser) {
    res.status(409)
    throw new Error('User already exists')
  }

  //ENCRYPT PASSWORD
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  //CREATE USER
  const user = await User.create({
    username: username,
    password: hashedPassword,
    email: email,
  })

  //RESPONSE
  if (user) {
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id)
    })
  } else {
    res.status(500)
    throw new Error('Problem processing request')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //VALIDATION
  if (!email || !password) {
    res.status(400)
    throw new Error('Please fill out all fields')
  }

  const existingUser = await User.findOne({ email: email })
  // console.log(existingUser)
  if (!existingUser) {
    res.status(404)
    throw new Error('User email not found')
  }

  //AUTHENTICATE USER (yetToEncrypt, previouslyEncrypted)
  const isVerifiedUser = bcrypt.compareSync(password, existingUser.password)
  if (!isVerifiedUser) {
    res.status(401)
    throw new Error('Password does not match')
  }

  //RESPONSE
  res.status(200).json({
    id: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
    token: generateToken(existingUser.id)
  })
})

const updateUser = asyncHandler(async (req, res) => {
  res.json({ message: 'User update route' })
  // const users = await User.find()
  // res.status(200).json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  const result = await User.findByIdAndDelete(req.user.id)
  if (!result) {
    res.status(500)
    throw new Error('User not found')
  }
  res.status(200).json({ id: req.user.id })
})

module.exports = { getUser, addUser, loginUser, updateUser, deleteUser }

// OLD VERSION
// const getUser = asyncHandler(async (req, res, next) => {
//   console.log(req.body)
//   console.log(req.user)
//   const token = req.headers.authorization.split(' ')[1]
//   const { id } = jwt.verify(token, process.env.JWT_SECRET)
//   console.log(id)
//   const { username, email } = await User.findById(id)
//   console.log(username)
//   res.status(200).json({
//     id: req.user.id,
//     username: req.user.username,
//     email: req.user.email,
//   })
//   res.json({ message: 'User get route' })
//   const users = await User.find()
//   res.status(200).json(users)
//   res.status(200).json(req.body)
// })