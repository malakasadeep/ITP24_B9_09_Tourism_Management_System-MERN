import React ,{useEffect,useState} from 'react'
import BackButton from '../../components/VehicleManagement/BackButton'
import axios from 'axios'
import { useNavigate ,useParams} from 'react-router-dom'
import { useSnackbar } from 'notistack'


const EditVehicle = () => {
  const [registerNumber, setregisterNumber] = React.useState('');
  const [model, setmodel] = React.useState();
  const [type, settype] = React.useState();
  const [location, setlocation] = React.useState();
  const [fuelType, setfuelType] = React.useState();
  const [loading, setloading] = React.useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/api/vehicle/get-vehi/${id}`)
    .then((res) => { 
      setregisterNumber(res.data.registerNumber);
      setmodel(res.data.model);
      settype(res.data.type);
      setlocation(res.data.location);
      setfuelType(res.data.fuelType);
    });
  }, []); 

  const handleUpdateSubmit = () => {
    const data={
      registerNumber,
      model,
      type,
      location,
      fuelType
    };
    setloading(true);
    axios.put(`/api/vehicle/update/${id}`,data)
      .then(() => {
        setloading(false);
        enqueueSnackbar('Vehicle Updated', { variant:'info' });
        navigate('/Vehicle');
      })
      .catch((error) => {
        setloading(false);
        enqueueSnackbar('Vehicle Updating Failed', { variant: 'error' });
        alert(error.message);
        console.error(error);
      }); 
  }

  return (
    <div>
      <div>EditVehicle</div>
      <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl font-bold'>Edit Vehicle</h1>
        <div className='flex flex-col sm:flex-row gap-4' onSubmit={handleUpdateSubmit}>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='registerNumber'>
              Register Number
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='registerNumber'
              type='text'
              placeholder='Register Number'
              defaultValue={registerNumber}
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
              defaultValue={model}
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
              defaultValue={type}
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
              defaultValue={location}
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
              defaultValue={fuelType}
              onChange={(e) => setfuelType(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold text-2xl  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-3/4 ml-12 mb-4' onClick={handleUpdateSubmit}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVehicle;


