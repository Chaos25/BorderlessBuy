import React from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {BrowserRouter as Router, Routes,Route, Link, Navigate,useParams } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const Header_logged_in=()=>{
    const usernameLog= useParams().user
return(
    
    <>
    {/*[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]*/}
  {/*[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]*/}
  {/*[if IE 8]>         <html class="no-js lt-ie9"> <![endif]*/}
  {/*[if gt IE 8]>      <html class="no-js"> <!--<![endif]*/}
  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <title>Cerebro</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
    crossOrigin="anonymous"
  />
  <meta name="description" content="" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
<link href="https://fonts.googleapis.com/css2?family=Mynerve&family=Quicksand&display=swap" rel="stylesheet"/>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
  />
  <nav className="navbar navbar-expand-lg ">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
      BorderlessBuy<SendRoundedIcon/>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          {/* {<Link to="/MainPage"><div className="nav-link" aria-current="page">Home</div></Link>} */}
           <Link to="/MainPage" className='Main_page'>Home</Link>
           
          </li>
          <li className='nav-item'> 
          <Link to="/Login" className='Main_page'>     Find Your Match</Link>
          </li>
          <li className='nav-item'>
<Link to="/CalculateCost" className='Main_page'>Calculate Cost</Link>
</li>
          </ul>
          <Link to={"/"+usernameLog+"/UserProfile"}>
          <AccountCircleIcon/>
        </Link>

      </div>
    </div>
  </nav>
  <nav>

  </nav>
  <br />
    </>
)
}