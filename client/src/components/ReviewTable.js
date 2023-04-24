import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function ReviewTable() {


  const [data, setData] = useState([]);
  const [f, setF] = useState();

  useEffect(() => {
    axios.post('http://localhost:3002/reviewTable').then((response) => {
      setData(response.data);
      setF(1);
    }).catch(error => {
      console.log(error);
    });;
  }, []);
  if (!f) {
    return (
      <div>Loading...</div>
    )
  }
  return (<table style={{ borderRadius: '10px', width: '100%', overflow: 'hidden' }}>
    <thead>
      <tr>
        <th >User</th>
        <th >Rating</th>
      </tr>
    </thead>
    <tbody>
      <td>{data.username}</td>
      <td>
        <Rating name="read-only" value={data.rating} precision={0.5} readOnly /></td>
    </tbody>
  </table>
  );


}

export default ReviewTable
