// CSS
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

// Router
import Router from './utils/Router'

// Modules
import dbFetch from './config/axios'
import { UserContext } from './context/UserContext'
import { useContext, useEffect } from 'react'
import { Flip, ToastContainer, toast } from 'react-toastify'

function App() {
  const { setUserId, setIsAdmin } = useContext(UserContext)

  const tryAuth = async() => {
    const res = await dbFetch.post("/users/tryauth")
    setUserId(res.data.user.id)
    setIsAdmin(res.data.user.isAdmin)
    toast.success(res.data.msg)
  }

  useEffect(() => {
    tryAuth()
  }, [])

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
