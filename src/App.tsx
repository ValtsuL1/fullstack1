import './App.css'
import Login from './pages/Login'
import {
  Route,
  Routes,
  Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Userpost from './pages/Userpost'
import { useAuth } from './auth/AuthProvider'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userpost/:id" element={<Userpost />} />
    </Routes>
  )

}

export default App
