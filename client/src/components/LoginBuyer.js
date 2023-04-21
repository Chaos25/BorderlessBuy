import React,{useState} from 'react'
import axios from 'axios'

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {BrowserRouter as Router, Routes,Route, Link, Navigate } from 'react-router-dom'
import { Header_home } from './Header_home';


export function LoginBuyer()
{
    //const [f,setF]=useState();
    
    const[usernameLog,setUsernameLog]=useState('');
    const[pwdLog,setPwdLog]=useState('')
    const[flag,setFlag]=useState()
    //const [loginStatus,setLoginStatus]=useState("")
    const handleUsernameChange = event => {
      setUsernameLog(event.target.value);
    };
  
    const handlePasswordChange = event => {
      setPwdLog(event.target.value);
    };
  
    const handleSubmit = event => {
      event.preventDefault();
  
      const data = {
        username: usernameLog,
        password: pwdLog,
      };
  
      axios.post('http://localhost:3002/LoginBuyer', data)
        .then(response => {
          console.log(response.data);
          if(response.data==='Buyer logged in successfully'){
            setFlag(1);
          }
        })
        .catch(error => {
          console.log(error);
        });};
    return (
        <>
        <div className="myRow">
        <div className='side_panel'>
       
          <div className='side'>
           <div className='navbar-brand'>BorderlessBuy<SendRoundedIcon/></div>
            <Link to="/"><div className='sidenav_link'>Home</div></Link>
            <Link to="/"><div className='sidenav_link'>Find your match</div></Link>
            <Link to="/"><div className='sidenav_link'>About us</div></Link>
          </div>
        </div>
        <div className=" login_page">
            <div className=' card login_signup_card'>
            <br/><h1 className='card_title'>Buyer Login</h1>
            <br/>
            <div className="mb-3">
            <input type="text" className="form-control text-container" placeholder="Username"onChange={handleUsernameChange}/>
            <br/>
            <br/>
            <input type="password" className="form-control" placeholder='Password' onChange={handlePasswordChange}/>
            <br/>
            <br/>
            
            <div className='marginn'><button type="submit" className="btn next" onClick={handleSubmit}>Login</button></div>
            {flag?<Navigate to={"/"+usernameLog+"/BuyerDetails"}/>:<h4></h4>}
       
           
            
            <br/>
            <Link to="/Signup" id='create'>
        Create Account
        </Link>
            <br/>
            <br/>
            
           {/* {f?<Navigate to={"/"+usernameLog+"/Results"}/>:<h4>{loginStatus}</h4>}*/}
            </div>
            </div>
          </div>
       </div>
       </>
    )
}