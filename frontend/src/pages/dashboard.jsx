import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGoals, reset } from '../features/goals/goalSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, isSuccess, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        {user ? <h1>Welcome {user.username}</h1> : null}
        <p>Goals Dashboard</p>

      </section>
      <GoalForm />
      <section className="content">
        {
          goals ?
            goals.map(goal => (
              <GoalItem goal={goal} key={goal._id} />
            ))
            :
            <h3>You do not have any goals</h3>
        }
      </section>
    </>
  )
}

export default Dashboard