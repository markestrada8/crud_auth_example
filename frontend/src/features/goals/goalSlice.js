import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// GET GOALS
export const getGoals = createAsyncThunk('goal/get', async (token, thunkAPI) => {
  const { user } = thunkAPI.getState().auth
  try {
    const result = await goalService.getGoals(user)
    // console.log('slice getHandler result :', result)
    return result
  } catch (error) {
    const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})

// ADD GOAL
export const addGoal = createAsyncThunk('goal/add', async (content, thunkAPI) => {
  const { user } = thunkAPI.getState().auth
  try {
    return await goalService.addGoal(content, user)
  } catch (error) {
    const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})

// UPDATE GOAL

// DELETE GOAL
export const deleteGoal = createAsyncThunk('goal/delete', async (id, thunkAPI) => {
  const { user } = thunkAPI.getState().auth
  try {
    return await goalService.deleteGoal(id, user)
  } catch (error) {
    const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
    return thunkAPI.rejectWithValue(message)
  }
})

export const goalSlice = createSlice({
  name: 'goals',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.goals = []
      })
      .addCase(addGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.goals = [...state.goals, action.payload]
        state.goals.push(action.payload)
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.goals = []
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.goals = [...state.goals, action.payload]
        state.goals = state.goals.filter(goal => goal._id !== action.payload.goalId)
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.goals = []
      })
    // .addCase(login.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(login.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.isSuccess = true
    //   state.user = action.payload
    // })
    // .addCase(login.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.isError = true
    //   state.message = action.payload
    //   state.user = null
    // })
    // .addCase(logout.fulfilled, (state) => {
    //   state.user = null
    // })
  }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
