import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import {Login} from './pages/Auth/Login.jsx'
import {SignUp} from './pages/Auth/SignUp.jsx'
import {Home} from './pages/Dashboard/Home.jsx'
import {Expense} from './pages/Dashboard/Expense.jsx'
import {Income} from './pages/Dashboard/Income.jsx'


const App = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element = {<Root />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/signup' element = {<SignUp />} />
          <Route path='/dashboard' element = {<Home />} />
          <Route path='/expense' element = {<Expense />} />
          <Route path='/income' element = {<Income />} />
      </Routes>
    </div>
  )
}

export default App

const Root = () =>{
  const isAuthentificated = !!localStorage.getItem("token");
  
  return isAuthentificated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to={"/login"} />
  );
};