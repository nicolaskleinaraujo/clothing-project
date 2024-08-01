// CSS
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

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

      <button onClick={() => console.log(userId)}>TESTEE</button>
      <Router />
    </>
  )
}

export default App
