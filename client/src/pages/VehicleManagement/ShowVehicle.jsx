import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/VehicleManagement/BackButton'



const ShowVehicle = () => {
  const [vehicle, setVehicle] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
   .get(`/api/vehicle/${id}`)
   .then((res) => {
        setVehicle(res.data);
        setLoading(false);
      })
   .catch((err) => {
        console.log(err);
      });
  }); 

  return (
    <div className='p-4'>
    <BackButton/>
    <h1 className='text-3xl my-4'>Vehicle Details</h1>
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
      <div className='my-4'>
        <span className='font-bold'>Register Number:</span>
        <span>{vehicle?.registerNumber}</span>
    </div>
    <div className='my-4'>
      <span className='font-bold'>Vehicle model:</span>
      <span>{vehicle?.model}</span>
    </div>
    <div className='my-4'>
      <span className='font-bold'>Vehicle type:</span>
      <span>{vehicle?.type}</span>
    </div>
    <div className='my-4'>
      <span className='font-bold'>Vehicle location:</span>
      <span>{vehicle?.location}</span>
    </div>
    <div className='my-4'>
      <span className='font-bold'>Fuel type:</span>
      <span>{vehicle?.fuelType}</span>
    </div>
    </div>
    </div> 
  )
}

export default ShowVehicle