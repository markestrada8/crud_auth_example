const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// AUTH FILTER LAYER FOR USER API
const protect = asyncHandler(async (req, res, next) => {
  // console.log('Auth header: ', req.headers)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token provided')
      }
      // DECODE DATA(ID, IAT, EXP) FROM TOKEN
      const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET)
      //QUERY MONGODB DATA INDEPENDENTLY WITH PIGGYBACK ID FROM TOKEN DATA
      req.user = await User.findById(decodedTokenData.id).select('-password')
      // MOVE ON TO USER/GET CONTROLLER, PASS FORWARD AMENDED REQUEST OBJECT
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Authentication failed')
    }
  }
})

module.exports = {
  protect
}
