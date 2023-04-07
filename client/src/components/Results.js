import React from 'react'
import { Header_home } from './Header_home'
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link, Navigate,useParams} from 'react-router-dom'
function Results() {
  const usernameLog= useParams().user
  return (
    <>
    <Header_home/>

    <div className='card login_page'>
      <h1 className='card_title' >Here are people that might be able to help you:</h1>
      <div className='container'> <br/>
      <br/>
   
      <Link to={"/"+usernameLog+"/Person"}><div className=" card res-card ">
        {/*<div className='profile_img' ><PersonPinCircleRoundedIcon style={{ fontSize: 120 }}/> </div>*/}
        <div className='info'>
            <div>Location: San Francisco</div>
            <div>Date of departure: 13/3/23</div>
            <div>Date of arrival: 20/3/23</div>
            <div>Rating:</div></div>
            
       
      </div></Link>
      <Link to={"/"+usernameLog+"/Person"}>
      <div className=" card res-card ">
        {/*<div className="profile_img"><PersonPinCircleRoundedIcon fontSize='large'/> </div>*/}
        <div className='info'>
            <div>Location: San Francisco</div>
            <div>Date of departure: 13/3/23</div>
            <div>Date of arrival: 20/3/23</div>
            <div>Rating:</div></div>
            
       
      </div></Link>
      <Link to={"/"+usernameLog+"/Person"}>
      <div className=" card res-card ">
       
        <div className='info'>
            <div>Location: San Francisco</div>
            <div>Date of departure: 13/3/23</div>
            <div>Date of arrival: 20/3/23</div>
            <div>Rating:</div></div>
            
       
      </div></Link>
      <Link to={"/"+usernameLog+"/Person"}>
      <div className=" card res-card ">
        <div className='info'>
            <div>Location: San Francisco</div>
            <div>Date of departure: 13/3/23</div>
            <div>Date of arrival: 20/3/23</div>
            <div>Rating:</div></div>
            
       
      </div>
      </Link>
      <Link to={"/"+usernameLog+"/Person"}>
      <div className=" card res-card ">
        <div className='info'>
            <div>Location: San Francisco</div>
            <div>Date of departure: 13/3/23</div>
            <div>Date of arrival: 20/3/23</div>
            <div>Rating:</div></div>
            
       
      </div></Link>
      <br/></div>
      <br/>
      <br/>
      <br/>
      <div className='marginn'><button className='btn next'>Submit</button></div>
          </div>
   
            
    </>
    
  )
}

export default Results
