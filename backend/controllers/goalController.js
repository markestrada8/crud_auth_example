const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }
  const { id } = req.user
  const goals = await Goal.find({ userId: id })
  res.status(200).json(goals)
})

const addGoal = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }
  const { id } = req.user
  if (!req.body.content) {
    res.status(400)
    throw new Error('Please enter a text value')
  }
  const goal = await Goal.create({
    userId: id,
    content: req.body.content
  })
  res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }
  const { id: goalId } = req.params
  const { id: authUserId } = req.user
  const goal = await Goal.findById(goalId)
  if (!goal) {
    res.status(500)
    throw new Error('Item not found')
  }
  // console.log(goal.userId.toString())
  // console.log(authUserId)
  if (goal.userId.toString() !== authUserId) {
    res.status(403)
    throw new Error('Not allowed')
  }
  const result = await Goal.findByIdAndUpdate(goalId, req.body, { new: true })

  res.status(200).json(result)
})

const deleteGoal = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }
  const { id: goalId } = req.params
  const { id: authUserId } = req.user
  const goal = await Goal.findById(goalId)
  // console.log(goal.userId.toString())
  // console.log(authUserId)
  if (goal.userId.toString() !== authUserId) {
    res.status(403)
    throw new Error('Not allowed')
  }
  const result = await Goal.findByIdAndDelete(goalId)
  if (!result) {
    res.status(500)
    throw new Error('Item not found')
  }
  res.status(200).json({ goalId })
})

module.exports = { getGoals, addGoal, updateGoal, deleteGoal }