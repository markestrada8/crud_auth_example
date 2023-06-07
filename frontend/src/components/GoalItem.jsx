import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch()

  return (
    <div className='goal' >
      <h2>{goal.content}</h2>
      <div>created: {new Date(goal.createdAt).toLocaleString('en-US')}</div>

      <button
        onClick={() => dispatch(deleteGoal(goal._id))}
        className='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem