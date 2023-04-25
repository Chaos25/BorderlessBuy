import React,{useState} from 'react'
import {BrowserRouter as Router, Routes,Route, Link,Navigate,useParams } from 'react-router-dom'
import { Header_home } from './Header_home';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header_logged_in_buyer } from './Header_logged_in_buyer';
export default function BuyerDetails() {
    const usernameLog= useParams().user
    const[flag,setF]=useState()
  const[date1,setd1]=useState('');
  const[loc,setloc]=useState('');
  const[loc2,setloc2]=useState('');
  const[date2,setd2]=useState('');
  const handleSubmit = async event => {
    event.preventDefault();
    
    const data = {
        username:usernameLog,
      date1:date1,
      loc1:loc,
      loc2:loc2,
      date2:date2

    };

    await axios.post('http://localhost:3002/BuyerDetails', data)
      .then(response => {
        if(response.data==='Buyer details submitted'){
          setF(1);
        }
        else setF(0);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
     
    };
  return (
    <>
     <Header_logged_in_buyer/>
    <br/>
    <div className='card login_page'>
      <h1 className='card_title' >Please fill in your details:</h1>
      <div className='container'> <br/>
      <br/>
      <br/>
      
      <div><FontAwesomeIcon icon="fa-solid fa-location-dot" /><input type="text" placeholder='Pickup Location:'className='form-control'onChange={(e)=>{setloc(e.target.value)}}/>
      </div><input type="text" placeholder='Drop Location:'className='form-control'onChange={(e)=>{setloc2(e.target.value)}}/>
      <input type="text" placeholder='Date of departure:'className='form-control'onChange={(e)=>{setd1(e.target.value)}}/>
      <input type="text" placeholder='Date of arrival:'className='form-control'onChange={(e)=>{setd2(e.target.value)}}/></div>
      <br/>
      <br/>
      <br/>
      <div className='marginn'><button className='btn next' onClick={handleSubmit}>Submit</button></div>
      {flag?<Navigate to={"/"+usernameLog+"/BuyerProfile"}/>:<h4></h4>}
          </div>
   
    </>
    )
}
