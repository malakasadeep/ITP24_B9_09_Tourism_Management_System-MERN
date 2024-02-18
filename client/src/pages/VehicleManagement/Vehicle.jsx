import React,{useEffect,useState} from 'react'
import axios from 'axios';
import{Link} from 'react-router-dom';
import VehicleHero from '../../components/VehicleManagement/VehicleHero';


function Vehicle() {
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
  }); 
  
  return (
    <div>
      <VehicleHero />
      <div className="md:px-24">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        </div>
      </div>
    </div>
  );
  }

export default Vehicle;



