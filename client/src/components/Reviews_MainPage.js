import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

export const Reviews_MainPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3002/')
            .then(response => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    let randomReviews = [];
    if (reviews.length > 0) {
        const shuffled = reviews.sort(() => 0.5 - Math.random());
        randomReviews = shuffled.slice(0, 3);
    }

    return (
        <MDBContainer className="py-5">
        <MDBRow className="d-flex justify-content-center">
            <MDBCol md="10" xl="8" className="text-center">
                <h3 className="mb-4">Reviews</h3>
            </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
            {randomReviews.map((review, index) => (
                <MDBCol key={index} md="4" className="mb-5 mb-md-0">
                    <div className="d-flex justify-content-center mb-4">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                            className="rounded-circle shadow-1-strong"
                            width="150"
                            height="150"
                        />
                    </div>
                    <h5 className="mb-3 reviewer">{review.username}</h5>
                    <h6 className="mb-3 reviewlocation">{review.location}</h6>
                    <p className="px-xl-3">
                        <MDBIcon fas icon="quote-left" className="pe-2" />
                        {review.review}
                    </p>
                    <MDBTypography
                        listUnStyled
                        className="d-flex justify-content-center mb-0"
                    >
                        <li>
                            <MDBIcon fas icon="star" size="sm" className="text-warning" />
                        </li>
                        <li>
                            <MDBIcon fas icon="star" size="sm" className="text-warning" />
                        </li>
                        <li>
                            <MDBIcon fas icon="star" size="sm" className="text-warning" />
                        </li>
                        <li>
                            <MDBIcon fas icon="star" size="sm" className="text-warning" />
                        </li>
                        <li>
                            <MDBIcon fas icon="star" size="sm" className="text-warning" />
                        </li>
                    </MDBTypography>
                </MDBCol>
            ))}
        </MDBRow>
    </MDBContainer>
    );
};
