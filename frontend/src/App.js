import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Register from './pages/register'
import Header from './components/header'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App