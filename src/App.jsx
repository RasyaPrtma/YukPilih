import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './modules/Auth/Login'
import { useAuth } from './modules/Context/AuthContext'
import AuthLayout from './modules/Layouts/AuthLayout'
import Register from './modules/Auth/Register'
import NavbarLayout from './modules/Layouts/NavbarLayout'


function App() {
  const { isLoggedin,isAdmin} = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          {isLoggedin ?
            isAdmin > 0 ? 
            <Route element={<NavbarLayout/>}>
              <Route path='admin' element={<h1 className='h1 text-[5rem]'>ADMIN</h1>}/>
              <Route path='*' element={<Navigate to={"/admin"}/>}/>
            </Route> :
              <Route element={<NavbarLayout/>}>
                <Route path='user' element={<h1 className='h1 text-[5rem]'>USER</h1>}/>
                <Route path='*' element={<Navigate to={"/user"}/>}/>
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
