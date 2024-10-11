import './App.css'
import useUser from './swr/useUser'
import Login from './pages/Login'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import { useState } from 'react'
import Userpost from './pages/Userpost'

function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userpost/:id" element={<Userpost />} />
      </Routes>
    </Router>
  )

}

export default App
