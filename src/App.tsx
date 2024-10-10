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

function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )

}

export default App
