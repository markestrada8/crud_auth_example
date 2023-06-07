import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGoal } from '../features/goals/goalSlice'

const GoalForm = () => {
  const [content, setContent] = useState('')
  const { goals } = useSelector((state) => state.goals)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(addGoal(content))
    setContent('')
  }

  const handleChange = (event) => {
    event.preventDefault()

    setContent(event.target.value)
  }


  return (
    <section className='form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='content'>Add a New Goal</label>
        <div className='form-group'>
          <input
            type='text'
            id='content'
            name='content'
            placeholder='Enter a goal'
            value={content}
            onChange={handleChange}
          />

        </div>
        <div className="form-group">
          <button className="btn btn-block">Add Goal</button>
        </div>

      </form>
    </section>
  )
}

export default GoalForm