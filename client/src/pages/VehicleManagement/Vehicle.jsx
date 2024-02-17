import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Spinner from '/component/spinner';
import{Link} from 'react-router-dom';



function Home() {
  const[vehicles,setVehicles]=useState([]);
  const[loading,setLoading]=useState(false);
    useEffect(()=>{
      setLoading(true);
       axios
        .get('http://localhost:5000/api/vehicles.js')
        .then((res)=>{
          setVehicles(res.data);
          setLoading(false);
        })
      
      .catch((error) => { 
        console.log(error);
        setLoading(false);
      });
    },);
  
  return (
    <div>
      <h1>Home</h1>
      {loading && <Spinner/>}
      <table>
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>Vehicle Model</th>
            <th>Vehicle Type</th>
            <th>Vehicle Price</th>
            <th>Vehicle Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.price}</td>
              <td>{vehicle.quantity}</td>
              <td>
                <Link to={`/get/${vehicle._id}`}>Show</Link>
                <Link to={`/update/${vehicle._id}`}>Edit</Link>
                <Link to={`/delete/${vehicle._id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;
