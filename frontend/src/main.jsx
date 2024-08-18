import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Context
import { UserProvider } from './context/UserContext.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'
import { RedirectProvider } from './context/RedirectContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="<your_client_id>">
      <UserProvider>
        <LoadingProvider>
          <RedirectProvider>
            <App />
          </RedirectProvider>
        </LoadingProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
