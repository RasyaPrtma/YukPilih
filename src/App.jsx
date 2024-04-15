import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './modules/Auth/Login'
import { useAuth } from './modules/Context/AuthContext'
import AuthLayout from './modules/Layouts/AuthLayout'
import Register from './modules/Auth/Register'
import NavbarLayout from './modules/Layouts/NavbarLayout'
import Poll from './modules/Admin/Poll'
import { PollProvider } from './modules/Context/PollContext'
import ResultVote from './modules/Admin/Layouts/ResultVote'
import ResultVoteById from './modules/Admin/Layouts/ResultVoteById'


function App() {
  const { isLoggedin,isAdmin} = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          {isLoggedin ?
            isAdmin > 0 ? 
            <Route element={<PollProvider><NavbarLayout/></PollProvider>}>
              <Route path='poll' element={<Poll/>}/>
              <Route path='vote/result' element={<ResultVote/>}/>
              <Route path='/vote/result/search' element={<ResultVoteById/>}/>
              <Route path='*' element={<Navigate to={"/poll"}/>}/>
            </Route> :
              <Route element={<NavbarLayout/>}>
                <Route path='user' element={<h1 className='h1 text-[5rem]'>USER</h1>}/>
                <Route path='vote' element={<h1 className='h1 text-[5rem]'>VOTE</h1>}/>
                <Route path='vote/result' element={<h1 className='h1 text-[5rem]'>RESULT VOTE USER</h1>}/>
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
