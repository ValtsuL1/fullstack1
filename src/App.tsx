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
import UpdatePost from './pages/Updatepost'
import Updatecomment from './pages/Updatecomment'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userpost/:id" element={<Userpost />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/userpost/update/:id" element={<UpdatePost />} />
      <Route path="/userpost/:userpostid/comment/:commentid" element={<Updatecomment />} />
    </Routes>
  )

}

export default App
