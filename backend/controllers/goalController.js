const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler((req, res) => {
  res.status(200).json({ message: 'get goals' })
})

const setGoal = asyncHandler((req, res) => {
  if (!req.body.content) {
    res.status(400)
    throw new Error('error posting')
  }
  res.status(200).json({ message: 'set goals' })
})

const updateGoal = asyncHandler((req, res) => {
  const id = req.params.id
  res.status(200).json({ message: `update goal ${id}` })
})

const deleteGoal = asyncHandler((req, res) => {
  const id = req.params.id
  res.status(200).json({ message: `delete goal ${id}` })
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }