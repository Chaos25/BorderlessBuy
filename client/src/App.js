import React, {useState,useEffect} from 'react'
import { getOrder } from "./apiCalls";
import './App.css'
import axios from 'axios'
import {BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom'
import {MainPage} from './components/MainPage';
import {Header_home} from './components/Header_home'
//import { Questions } from './pages/Questions';
import {Login} from './components/Login' 
import {Signup} from './components/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Findmatch from './components/Findmatch';
import Results from './components/Results'
import Person from './components/Person';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PaymentStatus from './components/PaymentStatus';
import Orders from './components/Orders';
import Reviews from './components/Reviews';
import { LoginBuyer } from './components/LoginBuyer';
import { SignupBuyer } from './components/SignupBuyer';
import BuyerDetails from './components/BuyerDetails';
import BuyerRegsuccessful from './components/BuyerRegsuccessful';
import CalculateCost from './components/CalculateCost';




function App() {
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
async function displayRazorpay() {
  const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await axios.post("http://localhost:3002/payment/orders",{amt:4000});

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: "rzp_test_TCiJRG5nyb2oCu", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "BorderlessBUy",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("http://localhost:3002/payment/success", data);

          alert(result.data.msg);
      },
      prefill: {
          name: "Riddhi Dayma",
          email: "abc@gmail.com",
          contact: "7447768700",
      },
      notes: {
          address: "Soumya Dey Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
  return (
    <> 

    <Router>
    <Routes>
  <Route path="/" element={<MainPage/>}/>
    <Route path="/MainPage" element={<MainPage/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Signup" element={<Signup/>}/>
    <Route path="/Review" element={<Reviews/>}/>
    <Route path="/LoginBuyer" element={<LoginBuyer/>}/>
    <Route path="/SignupBuyer" element={<SignupBuyer/>}/>
    <Route path="/:user/Findmatch" element={<Findmatch/>}/>
    <Route path="/:user/Results" element={<Results/>}/>
    <Route path="/:user/Person" element={<Person/>}/>
    <Route path="/:user/BuyerDetails" element={<BuyerDetails/>}/>
    <Route path="/:user/Successfull" element={<BuyerRegsuccessful/>}/>
    <Route
          path="/payment/status/:paymentId"
          element={<PaymentStatus/>}
        />
        <Route path=":user/Order"element={<Orders/>}/>
        <Route path="/CalculateCost" element={<CalculateCost/>} />
  </Routes>
    </Router>
 
    
      

    {/*<div>
      <div className='Qp1'>
        <h1>Questions</h1>
        <button onClick={qp1}>Show Questions</button>
      </div>
    </div>*/}
    </>
    
  );
}

export default App;