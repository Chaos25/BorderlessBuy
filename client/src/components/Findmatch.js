import React,{useState} from 'react'
import { Header_home } from './Header_home'
import { Header_logged_in } from './Header_logged_in';
import Rating from '@mui/material/Rating';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import {BrowserRouter as Router, Routes,Route, Link, Navigate,useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Findmatch() {
  const [buyerdetails, setBuyerDetails] = useState([]);
  const usernameLog= useParams().user
  const[product_name,setPName]=useState('');
  const[loc,setloc]=useState('');
  const[price,setprice]=useState('');
  const[loc2,setloc2]=useState('');
  const[link,setlink]=useState('');
  const[status,setStatus]=useState();
  const handlePChange = event => {
    setPName(event.target.value);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const data = {
      pname: product_name,
      locUser:loc,
      locBuyer:loc2,
      link:link,
      price:price

    };

    await axios.post('http://localhost:3002/Findmatch', data)
      .then(response => {
        if(response.data==='Buyer with given preferences not found'){
          setStatus(0);
        }
        else setStatus(1);
        //console.log(response.data);
        setBuyerDetails(response.data);
      })
      .catch(error => {
        console.log(error);
      });
     
    };
    async function handleElementClick(data) {
      const data2 = {
        pname: product_name,
        locUser:loc,
        locBuyer:loc2,
        link:link,
        username:usernameLog,
        buyer:data.username,
        date1:data.Arrival,
        date2:data.Departure,
        price:price
  
      };
      await axios.post('http://localhost:3002/Merge', data2)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      
    }
    
    
  return (
    <>
    <Header_logged_in/><div className="container carousel-wrapper-custom carousel-wrapper" style={{ height: '300px' }}>
    <Carousel className='car'>
      <Carousel.Item>
        <img
          className="d-block "
          src="https://img.freepik.com/free-vector/hand-drawn-girl-airport_52683-13260.jpg?w=900&t=st=1678082113~exp=1678082713~hmac=04d1cd7b90992682f5920d46ae3380e4aaec9d85f8ffdd89efeaef75b257e3e7"
          alt="First slide"
        />
        <Carousel.Caption>
         {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          src="https://img.freepik.com/free-vector/hand-drawn-international-trade-with-money_23-2149154535.jpg?w=900&t=st=1678081462~exp=1678082062~hmac=7b49b48955e702490d9d7189e105386ed11759896f4d3a2d9ee17379e61d9f40"
          alt="Second slide"
        />

        <Carousel.Caption>
          {/*<h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          src="https://img.freepik.com/free-vector/hand-drawn-flat-design-delivery-concept_23-2149154530.jpg?w=900&t=st=1678081497~exp=1678082097~hmac=8fab23e949b84029217c116595c6926fb3d610638b7c5e543cf7be66036f99ad"
          alt="Third slide"
        />

        <Carousel.Caption>
          {/*<h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>*/}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <br/>
    <br/>
    <br/>
    
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className='card login_page'>
      <h1 className='card_title' >Please fill the following form</h1>
      <div className='container'> <br/>
      <br/>
      <br/>
      
      <div><FontAwesomeIcon icon="fa-solid fa-location-dot" /><input type="text"onChange={handlePChange} placeholder='Product Name'className='form-control'/>
      </div><input type="text" placeholder='Link to product'onChange={(e)=>{
            setlink(e.target.value);
          }}className='form-control' />
      <input type="text" placeholder='Pickup Location'onChange={(e)=>{
            setloc2(e.target.value);
          }}className='form-control'/>
      <input type="text" placeholder='Drop Location' onChange={(e)=>{
            setloc(e.target.value);
          }} className='form-control'/>
          <input type="text" placeholder='Price'onChange={(e)=>{
            setprice(e.target.value);
          }}className='form-control' /></div>
      <br/>
      <br/>
      <br/>
      
   
   

      <div className='marginn'><button className='btn next' onClick={handleSubmit}>Submit</button></div>
      <div className='card login_page'>
      <h1 className='card_title' >Here are people that might be able to help you:</h1>
      <div className='container'> <br/>
      <br/>
      <div >
      {status ? buyerdetails.map((data, index) => (
  <div key={index} onClick={() => handleElementClick(data)}>
    <Link to={`/${usernameLog}/Order`} className="card res-card">
      <div className='info'>
        <div>Location: {data.loc1}</div>
        <div>Date of departure: {data.Departure}</div>
        <div>Date of arrival: {data.Arrival}</div>
        <div>Rating:<Rating name="read-only" value={data.rating} precision={0.5} readOnly /></div>
      </div>
    </Link>
  </div>
)) : <h4 className='card_title'>Nothing to show yet!</h4>}

  </div>

      <br/></div>
      <br/>
      <br/>
      <br/>
          </div>
     
      {/*status?<Navigate to={"/"+usernameLog+"/Order"}/>:<h4></h4>*/}
          </div>
   
            
    </>
    
  )
}

export default Findmatch
