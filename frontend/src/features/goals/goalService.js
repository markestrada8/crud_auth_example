
import axios from 'axios'

const API_URL = '/api/goals/'

const getGoals = async (user) => {

  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

const addGoal = async (content, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  const response = await axios.post(API_URL, { content: content }, config)
  return response.data
}

const deleteGoal = async (id, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  const response = await axios.delete(API_URL + id, config)
  return response.data
}

const goalService = {
  getGoals: getGoals,
  addGoal: addGoal,
  deleteGoal: deleteGoal
}

export default goalService