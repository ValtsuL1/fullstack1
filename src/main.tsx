import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Title from './title.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Title/>
    <App />
  </StrictMode>,
)
