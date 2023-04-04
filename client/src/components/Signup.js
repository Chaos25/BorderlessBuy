import React,{useState} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Routes,Route, Link,Navigate } from 'react-router-dom'
import { Header_home } from './Header_home'
export const Signup=()=>{
  const[flag,setFlag]=useState()
    const [usernameReg,setUsernameReg]= useState('')
    const [pwdReg,setPwdReg]= useState('')
    const handleUsernameChange = event => {
      setUsernameReg(event.target.value);
    };
  
    const handlePasswordChange = event => {
      setPwdReg(event.target.value);
    };
  
    const handleSubmit = event => {
      event.preventDefault();
  
      const data = {
        username: usernameReg,
        password: pwdReg,
      };
  
      axios.post('http://localhost:3002/Register', data)
        .then(response => {
          console.log(response.data);
          if(response.data==='User with email already exists'){
            alert('Username already exists, please choose a different one!');
            return;
          }
          setFlag(1);
          
        })
        .catch(error => {
          console.log(error);
        });};
    
    
return(
  <>
    <div class="myRow">
        <div className='side_panel'>
       
          <div className='side'>
           <div className='navbar-brand'>BorderlessBuy</div>
           <Link to="/"><div className='sidenav_link'>Home</div></Link>
            <Link to="/"><div className='sidenav_link'>Find your match</div></Link>
            <Link to="/"><div className='sidenav_link'>About us</div></Link>
          </div>
        </div>
        <div className=" login_page">
            <div className=' card login_signup_card'>
            <br/><h1 className='card_title'>SignUp</h1>
            <br/>
            <br/>
            <div className="mb-3">
            <input type="text" className="form-control text-container" placeholder="Username"onChange={handleUsernameChange}/>
            <br/>
            <br/>
            <input type="password" className="form-control" placeholder='Password' onChange={handlePasswordChange}/>
            <br/>
            <br/>
            <div className='marginn'><button type="submit" className="btn next" onClick={handleSubmit}>Sign Up!</button></div>
            {flag?<Navigate to={"/Findmatch"}/>:<h4></h4>}
            <br/>
           
            <br/>
            <br/>
            
            {/*f?<Navigate to={"/"+usernameLog+"/Results"}/>:<h4>{loginStatus}</h4>*/}
            </div>
            </div>
          </div>
       </div>
 
  </>
)
}