const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json(goals)
})

const addGoal = asyncHandler(async (req, res) => {
  if (!req.body.content) {
    res.status(400)
    throw new Error('Please enter a text value')
  }
  const goal = await Goal.create({
    content: req.body.content
  })
  res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params
  const goal = await Goal.findByIdAndUpdate(id, req.body, { new: true })
  if (!goal) {
    res.status(500)
    throw new Error('Item not found')
  }
  res.status(200).json(goal)
})

const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await Goal.findByIdAndDelete(id)
  if (!result) {
    res.status(500)
    throw new Error('Item not found')
  }
  res.status(200).json({ id })
})

module.exports = { getGoals, addGoal, updateGoal, deleteGoal }