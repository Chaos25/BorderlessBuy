import React, { useState, useEffect } from 'react';
import { Header_logged_in } from './Header_logged_in';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import DataTable from './DataTable';
import Chart from 'chart.js/auto';

function UserProfile() {
  const[location,setlocation]=useState('')
  const usernameLog = useParams().user;
  const [showKey, setShowKey] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [text, setText] = useState('');
  const[loc,setLoc]=useState('')
    /*const [chartData, setChartData] = useState(null);
    const chartRef = React.createRef();*/

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = {
        username:usernameLog,
        loc:loc,
        content:text
  
      };
    await axios.post('http://localhost:3002/PostReview', data)
      .then(console.log("Review submitted"))
      .catch(error => {
        console.log(error);
      });
     
    };
    
  const updateLoc = async event => {
    event.preventDefault();
    await axios.post('http://localhost:3002/UpdateLoca')
      .then(response=>{console.log(response.data)
      setlocation(response.data)})
      .catch(error => {
        console.log(error);
      });
     
    };
  const generateKey = async() => {
    const key = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
   await setSecretKey(key);
   console.log(secretKey)
    const data = {
       secretKey:key,
        username:usernameLog
      };
    await axios.post('http://localhost:3002/OTP',data).then(response=>{console.log(response.data)
setSecretKey(response.data)}).catch(error=>{
        console.log(error);
    })
  };

  const toggleKeyVisibility = () => {
    setShowKey(!showKey);
  };

  
  return (
    <>
      <div className='dashboard_bg'>
        <Header_logged_in />
        <div className='container'>
          <h3 className='pink'>
            Welcome back,{' '}
            <div className='heading_mainn'>
              {' '}
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString(usernameLog).start();
                }}
              />
            </div>
          </h3>
          <br />
          <br />
          <DataTable />
          <br />
          <br />
          <div className='row'>
            <div className='card db_card col-md-2 col-sm-12' onClick={toggleKeyVisibility}>
              <h1 style={{ color: '#2B3467' }}>{showKey ? secretKey : ''}</h1>
              {!showKey && <button className='btn next' onClick={generateKey}>Get OTP for current order</button>}
              
            </div>
            <div className='card db_card'><button className="btn next" onClick={updateLoc}>Track your Order</button>
              {location && <p>Location: {location}</p>}
              </div>
    <div className='card col-md-6 col-sm-12'><h6>Write a review</h6>
    <input type='text' onChange={(e)=>{
            setLoc(e.target.value);
          }} placeholder='Location'></input>
    <br/>
    <textarea id="text-area" placeholder='Review' value={text} onChange={handleTextChange} rows={5} cols={50} />
    <br/>
    <button className='btn next' onClick={handleSubmit}>Submit</button></div>
    
  </div>
  <br/>
  <br/>
  <br/></div></div>
    
    </>
  )
}

export default UserProfile
