// CSS
import './App.css'

// Router
import Router from './utils/Router'

// Modules
import { Flip, ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer 
        position="bottom-center" 
        autoClose={1500} 
        pauseOnHover={false} 
        closeOnClick 
        transition={Flip} 
      />

      <Router />
    </>
  )
}

export default App
