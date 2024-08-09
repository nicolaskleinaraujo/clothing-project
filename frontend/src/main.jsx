import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Context
import { UserProvider } from './context/UserContext.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </UserProvider>
  </React.StrictMode>,
)
