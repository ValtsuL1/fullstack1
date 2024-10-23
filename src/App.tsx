import './App.css'
import Login from './pages/Login'
import {
  Route,
  Routes,} from 'react-router-dom'
import Home from './pages/Home'
import Userpost from './pages/Userpost'
import Register from './pages/Register'
import CreatePost from './pages/Createpost'
import Profile from './pages/Profile'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userpost/:id" element={<Userpost />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  )

}

export default App
