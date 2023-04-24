import React from 'react'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import App from './App'
import PaymentStatus from './components/PaymentStatus'
import { MainPage } from './components/MainPage'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import Findmatch from './components/Findmatch'
import Results from './components/Results'
function Routes() {
  return (
    <>
    
    <Router>
    <Routes>
  <Route path="/" element={<MainPage/>}/>
    <Route path="/MainPage" element={<MainPage/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Signup" element={<Signup/>}/>
    <Route path="/Findmatch" element={<Findmatch/>}/>
    <Route path="/Results" element={<Results/>}/>
    <Route path="/payment/status/:paymentId" element={<PaymentStatus/>}/>
  </Routes>
    </Router>
    </>
  )
}

export default Routes
