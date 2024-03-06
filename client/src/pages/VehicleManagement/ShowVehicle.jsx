import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/VehicleManagement/BackButton'

const ShowVehicle = () => {
  const [vehicle, setVehicle] = useState(null); // Change initial state to null
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/vehicle/get-vehi/${id}`)
      .then((res) => {
        setVehicle(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Vehicle Details</h1>
      {vehicle ? (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='font-bold'>Register Number:</span>
            <p className='text-green-900 font-bold'>{vehicle.registerNumber}</p>
          </div>
          <div className='my-4'>
            <span className='font-bold'>Vehicle model:</span>
            <span>{vehicle.model}</span>
          </div>
          <div className='my-4'>
            <span className='font-bold'>Vehicle type:</span>
            <span>{vehicle.type}</span>
          </div>
          <div className='my-4'>
            <span className='font-bold'>Vehicle location:</span>
            <span>{vehicle.location}</span>
          </div>
          <div className='my-4'>
            <span className='font-bold'>Fuel type:</span>
            <span>{vehicle.fuelType}</span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowVehicle; 
