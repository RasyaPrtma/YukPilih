import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './modules/Auth/Login'
import { useAuth } from './modules/Context/AuthContext'
import AuthLayout from './modules/Layouts/AuthLayout'
import Register from './modules/Auth/Register'


function App() {
  const { isLoggedin } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          {isLoggedin ?
            <Route>
              <Route path='main' element={<h1 className=' h-[100vh] grid place-items-center text-[white] font-bold text-[5rem]'>Hello World</h1>} />
              <Route path='*' element={<Navigate to={'/main'} />} />
            </Route> 
            :
            <Route element={<AuthLayout/>}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='*' element={<Navigate to={"/login"} />} />
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
