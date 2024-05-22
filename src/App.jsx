
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Hero from './pages/hero/Hero'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Blog from './pages/blog/Blogpage'
import Newblog from './pages/blog/Newblog'
import BlogPost from './pages/blog/BlogPost'
import { useAuthContext } from './context/AuthContext'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  const { authUser } = useAuthContext()

  return (
    <>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <Signup />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/new-blog' element={<Newblog />} />
        <Route path='/blog-post/:title' element={<BlogPost />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    </>
  )
}

export default App
