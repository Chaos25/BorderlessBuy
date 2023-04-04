import React from "react";
import { Header_home } from "./Header_home";

export const MainPage=()=>
{
    return (
        <>
        <Header_home/>
        <div class="container">
        <div class="row"> 
        <br/>
        <br/>
        <div class="col-md-6 col sm-12">
            <br/>
            
       <div className="para">
           <br/>
           <div>
           Our webapp, is designed to make international shopping accessible and affordable for users in India. By leveraging strategic partnerships and cutting-edge technology, DutyFreeIndia enables users to order products from foreign countries without having to pay any import charges or taxes.

With a user-friendly interface and a wide selection of products from popular brands and retailers around the world, BorderlessBuy makes it easy for users to find and purchase the items they need or want. Users can browse the app's inventory by category, brand, or keyword, and use advanced search filters to narrow down their options.

BorderlessBuy's innovative technology also allows users to track their orders in real-time and receive notifications on shipping and delivery status. In addition, the app offers secure payment options and a hassle-free return policy to ensure a seamless and risk-free shopping experience.

Overall, BorderlessBuy provides a convenient and cost-effective solution for users in India who are looking to access a wider range of products from international markets without the added burden of import charges and taxes.





       </div>
       <br/>
       <h5 className="pink">Browse to find your match!</h5>
       <br/>
       <br/>
       <br/>
       </div>
        </div>
        <div class="col-md-6 col sm-12">
            <img className="img_front"src="https://img.freepik.com/free-vector/hand-drawn-flat-design-international-trade_23-2149154534.jpg?w=740&t=st=1678013929~exp=1678014529~hmac=b2f29e226a60aa2381c94785b39340d903923cce5487bd221563954a2666b08e" width="600px"/>
        </div>
        </div>
        </div>
        </>
    )
}