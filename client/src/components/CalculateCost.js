import React, { useState } from 'react'
import { Header_home } from './Header_home'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function CalculateCost() {
    const [weight, setWeight] = useState("");

    const [shippingCost, setShippingCost] = useState(0);
    const [originCity, setOriginCity] = useState('');
    const [originState, setOriginState] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [packageValue, setPackageValue] = useState("");
    const [indianCost, setIndianCost] = useState(0);
    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handlepackageValueChange = (event) => {
        setPackageValue(event.target.value);
    };

    let cost = 0;
    const handleSubmit = (event) => {
        event.preventDefault();

        if (weight <= 1 && weight != 0) {
            cost = 10;
        } else if (weight <= 5 && weight != 0) {
            cost = 20;
        } else if (weight <= 10 && weight != 0) {
            cost = 30;
        } else if (weight != 0) {
            cost = 50;
        }
        if (packageValue <= 100) {
            cost = cost + packageValue * 0.05;
        }
        else if (packageValue <= 500) {
            cost = cost + packageValue * 0.1;
        }
        else if (packageValue > 500) {
            cost = cost + packageValue * 0.15;
        }

        const apiKey = "f43b54b7d78b4e56ac7bcb0853d3fa73";
        axios.get(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`)
            .then(response => {
                const rate = response.data.rates.INR;
                const inrCost = (cost * rate).toFixed(2);
                console.log(`The cost in INR is: ${inrCost}`);
                setIndianCost(inrCost);
                // display the inrCost to the user in the UI
            })
            .catch(error => {
                console.log(`Error retrieving exchange rate data: ${error}`);
            });
        setShippingCost(cost.toFixed(2));
    };
    // const handleSubmit1 = async (event) => {

    //     // replace with your actual API key
    //     const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`);
    //     const rate = response.data.rates.INR;
    //     const inrCost = (cost * rate).toFixed(2);
    //     setIndianCost(inrCost);
    //     console.log(indianCost);
    // }
    return (<>
        <div>
            <Header_home />
            <div className='container'>
                <h1 className='card_title' >Calculate Your Shipment</h1>
                <div > <br />
                    <br />
                    <br />
                    <div className='row'>
                        <div className='col-md-6'><form class='shipform' onSubmit={handleSubmit}>
                            <label >
                                Origin City:
                                <input type="text" value={originCity} onChange={(e) => setOriginCity(e.target.value)} />
                            </label>
                            <br />
                            <label >
                                Origin State:
                                <input type="text" value={originState} onChange={(e) => setOriginState(e.target.value)} />
                            </label>
                            <br />
                            <label >
                                Destination City:
                                <input type="text" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} />
                            </label>
                            <br />
                            <label >
                                Package Value:
                                <input type="text" value={packageValue} onChange={(e) => setPackageValue(e.target.value)} />
                            </label >
                            <br />
                            <label  >
                                Weight (in kg):
                                <input type="number" value={weight} onChange={handleWeightChange} />
                            </label>
                            <br />

                            <br />
                            <button className="btn next logi" type="submit">Calculate Shipping Cost</button>
                            {shippingCost > 0 && (
                                <p>The shipping cost is {shippingCost} USD.</p>

                            )}
                            {indianCost > 0 && (<p>The shipping cost in rupees is {indianCost} INR.</p>)}
                            {/* <form onSubmit={handleSubmit1}>
                    <button className='btn next1'> Convert</button>
                </form>
                {indianCost>0 && (<p>The shipping cost in rupees is {indianCost}</p>
)} */}
                        </form></div>
                        <div className='col-md-6'><img src="https://img.freepik.com/free-vector/online-payment-account-credit-card-details-personal-information-financial-transaction-cartoon-character-bank-worker-internet-banking_335657-2379.jpg?w=740&t=st=1682346882~exp=1682347482~hmac=6368a9ba6508dc154f4a28e61491d692cd1c620828a7f0f862fabbc5e4106eae" width="600px" /></div>
                    </div>
                    <br />



                </div>
            </div>
        </div>

    </>
    )
}

export default CalculateCost