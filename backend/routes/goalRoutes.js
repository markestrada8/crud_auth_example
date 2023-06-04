const express = require('express')
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const router = express.Router()

router.get('/', getGoals)

router.post('/', addGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)

module.exports = router

