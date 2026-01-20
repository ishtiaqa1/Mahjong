import React, {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./pages/LoginPage.jsx";
import "./pages/Signup.jsx";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
