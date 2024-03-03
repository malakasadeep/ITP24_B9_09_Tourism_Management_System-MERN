import React,{useEffect,useState} from 'react'
import axios from 'axios';
import{Link} from 'react-router-dom';
//import VehicleHero from '../../components/VehicleManagement/VehicleHero';


function Vehicle() {
  const[vehicles,setVehicles]=useState([]);
  const[loading,setLoading]=useState(false);
  useEffect(()=>{
  setLoading(true);
   axios
  .get('http://localhost:3000/api/vehicle')
  .then((res)=>{
    setVehicles(res.data);
    setLoading(false);
  })
  
  .catch((error) => { 
  console.log(error);
  setLoading(false);
  });
  },[]); 
  
  return (
    <div>
    
      <div className="md:px-24">
      
          <h1>hi</h1>
    <th>Vehicle</th><th>type</th><th>location</th>
      </div>
    </div>
  );
  }

export default Vehicle;



