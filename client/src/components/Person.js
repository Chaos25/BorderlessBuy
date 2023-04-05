import React, { useState } from 'react'
import { Header_home } from './Header_home'
import Carousel from 'react-bootstrap/Carousel';
import {BrowserRouter as Router, Routes,Route, Link, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Person() {
  const[flag,setF]=useState()
  return (
    <>
    <Header_home/>
    <br/>
    <div className='card login_page'>
      <h1 className='card_title' >hi</h1>
      <div className='container'> <br/>
      <br/>
      <br/><input type="text" placeholder='Pickup Location'className='form-control'/>
      
      <div><FontAwesomeIcon icon="fa-solid fa-location-dot" /><input type="text" placeholder='Product Name'className='form-control'/>
      </div><input type="text" placeholder='Link to product'className='form-control'/>
      <input type="text" placeholder='Price'className='form-control'/>
      <input type="text" placeholder='Drop Location'className='form-control'/></div>
      <br/>
      <br/>
      <br/>
      <div className='marginn'><button className='btn next' onClick={setF(1)}>Submit</button></div>
      {flag?<Navigate to={"/Order"}/>:<h4></h4>}
          </div>
   
            
    </>
    
  )
}

export default Person
