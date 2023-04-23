import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Routes,Route, Link, Navigate,useParams } from 'react-router-dom'
function DataTable() {
 
    
  const [data, setData] = useState([]);
  const[f,setF]=useState();

  useEffect(() => {
    axios.post('http://localhost:3002/dataTable').then((response) => {
      setData(response.data);
      setF(1);
    }).catch(error => {
        console.log(error);
      });;
  }, []);
  if(!f){
    return(
      <div>Loading...</div>
    )
  }
  return (<table style={{ borderRadius: '10px',width:'100%', overflow: 'hidden' }}>
    <thead>
      <tr>
        <th >Product Name</th>
        <th >Price</th>
        <th >Status</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={item.id} style={{borderBottom: '1px solid lightgray',width:'60%'}}>
          <td>{item.pname}</td>
          <td>{item.price}</td>
          <td>
            {item.status === 'active' ? (
              <span className="badge text-bg-success">Delivered</span>
            ) : (
              <span className="badge text-bg-secondary">Processing</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );

  
}

export default DataTable
