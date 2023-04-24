import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Header_home } from './Header_home';
import axios from 'axios'
import { Header_logged_in } from './Header_logged_in';
const labels = {
    0.5: 'Very Poor',
    1: 'Poor',
    1.5: 'Below Average',
    2: 'Average',
    2.5: 'Above Average',
    3: 'Good',
    3.5: 'Very Good',
    4: 'Great',
    4.5: 'Excellent',
    5: 'Exceptional',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function UserRating() {
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);

    const rating =async (event) => {
        event.preventDefault();
        
        const data = {
            rating:value
       
           };
        await axios.post('http://localhost:3002/Rating', data)
          .then(response => {
            if(response.data==='Updated Rating'){
              alert('Updated')
            }
            else alert('Cannot Update')
          })
          .catch(error => {
            console.log(error);
          });
         
      };
    return (
        <>
        <Header_logged_in/>
        <div className='userratingpage'>
        <h1 >Leave a Rating For Your Traveller! </h1>
        <div className='userrating'>
        <Box
            sx={{
                width: 200,
                // display: 'flex',
                // alignItems: 'center',
            }}
        >
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
        </div>
        <br/>
        <p>You have given the traveller a rating of : {value}</p>
        <button className='btn ratingbtn' onClick={rating}>Submit</button>
        </div>
        
        </>
        
    );
}
