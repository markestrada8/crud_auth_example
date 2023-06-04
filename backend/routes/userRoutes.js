const express = require('express')
const { getUser, addUser, loginUser, updateUser, deleteUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', protect, getUser)

router.post('/', addUser)

router.post('/login', loginUser)

router.put('/:id', updateUser)

router.delete('/', protect, deleteUser)

module.exports = router