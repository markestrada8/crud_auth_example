const express = require('express')
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', protect, getGoals)

router.post('/', protect, addGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)

module.exports = router

