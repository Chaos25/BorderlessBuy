import React from 'react'
import { Header_home } from './Header_home'
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Person() {
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
      <div className='marginn'><button className='btn next'>Submit</button></div>
          </div>
   
            
    </>
    
  )
}

export default Person
