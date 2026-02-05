import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginLayout from './LoginLayout.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App/>
    
  </StrictMode>
)
