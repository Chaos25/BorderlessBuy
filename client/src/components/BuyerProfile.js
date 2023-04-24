import React,{useState} from 'react'
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import ReviewTable from './ReviewTable';
import Chart from 'chart.js/auto';
import { Header_logged_in_buyer } from './Header_logged_in_buyer'

function BuyerProfile() {
    const usernameLog=useParams.user
    const [showInput, setShowInput] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [loc, setloc] = useState('');

  const handleVerifyClick =async (event) => {
    event.preventDefault();
    

    
    
    setShowInput(true);
    const data = {
        otp:otpValue
   
       };
    await axios.post('http://localhost:3002/Verify', data)
      .then(response => {
        if(response.data==='Verified'){
          alert('Verified')
        }
        else alert('Wrong OTP')
      })
      .catch(error => {
        console.log(error);
      });
     
  };
  const handlelocationUpdate =async (event) => {
    event.preventDefault();
    
    const data = {
        locup:loc
   
       };
    await axios.post('http://localhost:3002/UpdateLoc', data)
      .then(response => {
        if(response.data==='Updated'){
          alert('Updated')
        }
        else alert('Cannot Update')
      })
      .catch(error => {
        console.log(error);
      });
     
  };

  const handleInputChange = (event) => {
    setOtpValue(event.target.value);
  };

 
  return (
    <>
    <div className='dashboard_bg'>
    <Header_logged_in_buyer/>
    <div className='container'>
          <h3 className='pink'>
            Welcome back!
            
          </h3>
          <br />
          <br />
          <ReviewTable />
          <br />
          <br />
          <div className='row'>
            <div className='card db_card col-md-2 col-sm-12' >
           
        <input
            type='text'
            placeholder='Enter OTP'
            value={otpValue}
            onChange={handleInputChange}
          />
          <br/>
        <button className='btn next' onClick={handleVerifyClick}>
            Verify OTP
          </button>
             
            </div>
    
            <div className='card db_card'><input
            type='text'
            placeholder='Enter location'
            onChange={(e)=>{
                setloc(e.target.value);
              }}
          />
          <br/>
        <button className='btn next' onClick={handlelocationUpdate}>Update Location</button></div>
  </div>
  <br/>
  <br/>
  <br/></div></div>
    </>
  )
}

export default BuyerProfile
