import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Header_home } from './Header_home';
import Findmatch from './Findmatch';
function Orders() {
  const [mergeddata,setmdata]=useState();
  const[f,setF]=useState()
  useEffect(()=>{
    axios.post('http://localhost:3002/xyz')
    .then(response => {
      console.log(response.data);
      setmdata(response.data)
      setF(1);
      
    })
    .catch(error => {
      console.log(error);
    });
  },[])
  useEffect(()=>{
    console.log(mergeddata)
  },[mergeddata])
  
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
async function displayRazorpay() {
  const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await axios.post("http://localhost:3002/payment/orders",{amt:parseInt(mergeddata.price)*100});

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: "rzp_test_TCiJRG5nyb2oCu", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "BorderlessBuy Pvt Ltd.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              price:mergeddata.price,
              user:mergeddata.username,
              buyer:mergeddata.buyer
          };

          const result = await axios.post("http://localhost:3002/payment/success", data);
          console.log(result.data);
          alert(result.data);
      },
      prefill: {
        name: "Riddhi Dayma",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
          address: "BorderlessBuy Manipal",
      },
      theme: {
          color: "#2B3467",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
if(!mergeddata){
  return(
    <div>Loading...</div>
  )
}
  return (
    
    <div>
      <Header_home/>
      
      <div className='card login_page'>
      <h1 className='card_title' >Confirm your preferences and proceed to pay</h1>
      {f?<div className='card'>
        
        <label>Product Name: {mergeddata.pname} </label>
        <br/>
        <label>Product link: {mergeddata.link} </label>
        <br/>
        <label>Delivery location: {mergeddata.location1}</label>
        <br/>
        <label>Expected Location for order: {mergeddata.location2}</label>
        <br/> 
        <label>Price: {mergeddata.price}</label>
        </div>
        : <p>Loading!</p>}
      <div className='marginn'><button className='btn next' onClick={displayRazorpay}>Confirm and Make Payment</button></div>
          </div>
      
        </div>
        
      
  )
}

export default Orders