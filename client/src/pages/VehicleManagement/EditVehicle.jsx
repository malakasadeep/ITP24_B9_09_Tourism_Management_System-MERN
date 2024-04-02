import React ,{useEffect,useState} from 'react'
import BackButton from '../../components/VehicleManagement/BackButton'
import axios from 'axios'
import { useNavigate ,useParams} from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Swal from 'sweetalert2'


const EditVehicle = () => {
  const [ownername, setownername] = React.useState('');
  const [brand, setbrand] = React.useState();
  const [model, setmodel] = React.useState();
  const [type, settype] = React.useState();
  const [seats, setseats] = React.useState();
  const [regno, setregno] = React.useState();
  const [price, setprice] = React.useState();
  const [transmission, settransmission] = React.useState();
  const [description, setdescription] = React.useState();
  const [location, setlocation] = React.useState();


  
  const [loading, setloading] = React.useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/api/vehicle/get-vehi/${id}`)
    .then((res) => {
      setownername(res.data.ownername);
      setbrand(res.data.brand);
      setmodel(res.data.model);
      settype(res.data.type);
      setregno(res.data.regno);
      setseats(res.data.seats);
      settransmission(res.data.transmission);
      setprice(res.data.price);
      setdescription(res.data.description);
      setlocation(res.data.location);
    });
  }, []); 

  const handleUpdateSubmit = () => {
    const data={
      ownername,
      brand,
      model,
      type,
      regno,
      seats,
      transmission,
      price,
      description,
      location
    };
    setloading(true);
    axios.put(`/api/vehicle/update/${id}`,data)
      .then(() => {
        setloading(false);
        Swal.fire({
          
          icon: 'success',
          title: 'Your Vehicle updated Successfully',
          showConfirmButton: false,
          timer: 2000
        }) 
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
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='ownername'>
             Owner Name
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='ownername'
              type='text'
              placeholder='Owner Name'
              defaultValue={ownername}
              onChange={(e) => setownername(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='brand'>
            Brand
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='brand'
              type='text'
              placeholder='Brand'
              defaultValue={brand}
              onChange={(e) => setbrand(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='model'>
            Model
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='model'
              type='model'
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
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='regno'>
              Registration Number
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='regno'
              type='text'
              placeholder='Registration Number'
              defaultValue={regno}
              onChange={(e) => setregno(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
              Price
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='price'
              type='number'
              placeholder='Price'
              defaultValue={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
              Description
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='description'
              type='text'
              placeholder='Description'
              defaultValue={description}
              onChange={(e) => setdescription(e.target.value)}
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
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='seats'>
              Seats
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='seats'
              type='number'
              placeholder='Seats'
              defaultValue={seats}
              onChange={(e) => setseats(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='transmission'>
              Transmission
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='transmission'
              type='text'
              placeholder='Transmission'
              defaultValue={transmission}
              onChange={(e) => settransmission(e.target.value)}
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


