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
        <Header_home />
        <div className='card shipment_page'>
            <h1 className='card_title' >Calculate Your Shipment</h1>
            <div className='container-shipment'> <br />
                <br />
                <br />
                <form class='shipform' onSubmit={handleSubmit}>
                    <label class="shiptext0" >
                        Origin City:
                        <input class="shiptext1" type="text" value={originCity} onChange={(e) => setOriginCity(e.target.value)} />
                    </label>
                    <br />
                    <label class="shiptext0" >
                        Origin State:
                        <input class="shiptext1" type="text" value={originState} onChange={(e) => setOriginState(e.target.value)} />
                    </label>
                    <br />
                    <label class="shiptext0" >
                        Destination City:
                        <input class="shiptext1" type="text" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} />
                    </label>
                    <br />
                    <label class="shiptext0" >
                        Package Value:
                        <input class="shiptext1" type="text" value={packageValue} onChange={(e) => setPackageValue(e.target.value)} />
                    </label >
                    <br />
                    <label class="shiptext0" >
                        Weight (in kg):
                        <input type="number" value={weight} onChange={handleWeightChange} />
                    </label>
                    <br />

                    <br />
                    <button className="btn next logi" type="submit">Calculate Shipping Cost</button>
                </form>
                {shippingCost > 0 && (
                    <p>The shipping cost is {shippingCost} USD.</p>

                )}
                {indianCost > 0 && (<p>The shipping cost in rupees is {indianCost} INR.</p>)}
                {/* <form onSubmit={handleSubmit1}>
                    <button className='btn next1'> Convert</button>
                </form>
                {indianCost>0 && (<p>The shipping cost in rupees is {indianCost}</p>
)} */}


            </div>
        </div>

    </>
    )
}

export default CalculateCost