import React from 'react'
import BackButton from '/../components/BackButton' // Import the BackButton component
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddVehicle = () => {
  const [registerNumber, setregisterNumber] = React.useState('');
  const [model, setmodel] = React.useState();
  const [type, settype] = React.useState();
  const [location, setlocation] = React.useState();
  const [fuelType, setfuelType] = React.useState();
  const navigate = useNavigate();
 const handleSubmit = () => {
    const data={
      registerNumber,
      model,
      type,
      location,
      fuelType
      };
            setloading(true);
            axios.post('http://localhost:5000/api/vehicles',data)
            .then(()=>{
               setloading(false);
               navigate('/vehicles');
        })
        .catch((error) => {
          setloading(false);
          alert(error.message)
          console.error(error);
        }); // Add a comma here
      }

        // Add the missing closing tag for the CreateVehicle component
        return (
    <div>
      <div>AddVehicle</div>
      <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl font-bold'>Add Vehicle</h1>
        <div className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='registerNumber'>
              Register Number
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='registerNumber'
              type='text'
              placeholder='Register Number'
              onChange={(e) => setregisterNumber(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='model'>
              Model
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='model'
              type='text'
              placeholder='Model'
              onChange={(e) => setmodel(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='type'>
              Type
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='type'
              type='text'
              placeholder='Type'
              onChange={(e) => settype(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='location'>
              Location
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='location'
              type='text'
              placeholder='Location'
              onChange={(e) => setlocation(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='fuelType'>
              Fuel Type
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='fuelType'
              type='text'
              placeholder='Fuel Type'
              onChange={(e) => setfuelType(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold text-2xl  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-3/4 ml-12 mb-4'>Add Vehicle</button>
          </div>
        </div>
      </div>
    </div>
  );
}




