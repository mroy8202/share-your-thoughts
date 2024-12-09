import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import OpenRoute from './components/OpenRoute'
import PrivateRoute from './components/PrivateRoute'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import PostDetail from './components/PostDetail'

function App() {

  return (
    <div className='w-screen'>
      {/* Navbar */}
      <Navbar />

      <Routes>
        {/* signup route */}
        <Route path='/' 
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        {/* Login page */}
        <Route path='/login' 
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        {/* homepage */}
        <Route path='/user/homepage'
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />

        {/* Post Detail */}
        <Route path='/post/:id'
          element={<PostDetail />}
        />

      </Routes>

      
    </div>
  )
}

export default App
