import './App.css'
import Login from './pages/Login'
import {
  Route,
  Routes,} from 'react-router-dom'
import Home from './pages/Home'
import Userpost from './pages/Userpost'
import Register from './pages/Register'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/userpost/:id" element={<Userpost />} />
    </Routes>
  )

}

export default App
