import VehicleHero from "../../components/VehicleManagement/VehicleHero";
import SearchBar from "../../components/VehicleManagement/SearchBar";
import VehicleListHeader from "../../components/VehicleManagement/VehicleListHeader";
import RentCarAd from "../../components/VehicleManagement/RentCarAd";
import { useLocation } from "react-router-dom";
import VehicleCard from "../../components/VehicleManagement/VehicleCard";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API requests

const VehicleHome = () => {
  
  const location = useLocation();
  const data = location.state;
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/vehicle')
      .then((res) => {
        setVehicles(res.data);
        setLoading(false);
      })
      .catch((error) => { 
        console.log(error);
        setLoading(false);
      });
  }, []); 

  console.log("data:", data);

  return (
    <div>
      <VehicleHero />
      <div className='bg-white mt-4 lg:mt-[-52px] px-8 shadow-lg max-w-[750px] p-4 lg:text-left text-center h-full items-center mx-auto rounded-lg'>
            <form className='flex flex-col lg:flex-row justify-between px-4'>
                <div className='flex flex-col'>
                    <label htmlFor='vehicleType' className='py-3'>Vehicle Type</label>
                    <select className='p-3 border rounded-md w-full'  > 
                        <option value=''>All</option>
                        <option>E-Vehicles</option>
                        <option>Car</option>
                        <option>SUV</option>
                        <option>Van</option>
                        <option>Motor Bike</option>
                        <option>Tuk Tuk</option>
                        <option>Bus</option>
                    </select>
                </div>

                <div className='flex flex-col pl-16'>
                    <label htmlFor='pickupLocation' className='py-3'>Pick-up Location</label>
                    <input type='text' list='city' className='border rounded-md p-3 lg:w-[300px] w-full' placeholder='Colombo'></input>
                    <datalist id='city'>
                        <option value='Colombo'/>
                        <option value='Galle'/>
                        <option value='Matara'/>
                        <option value='Mount Lavinia'/>
                        <option value='Kandy'/>
                        <option value='Katunayake Airport'/>
                        <option value='Negombo'/>
                    </datalist>
                </div>
                {/* Other form elements */}
            </form>
            <button className='bg-[#989999] text-white rounded-md font-medium py-3 w-full'>Search</button>
        </div>
      <VehicleListHeader />
      <div className="md:px-24">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {vehicles.map((vehicle) => ( 
            <VehicleCard
              key={vehicle._id} 
              brand={vehicle.brand}
              image={vehicle.imageUrls}
              model={vehicle.model}
              price={vehicle.price}
              transmissionType={vehicle.transmissionType}
              fuelType={vehicle.fuelType}
              capacity={vehicle.seats}
              vehicleMainImg={vehicle.vehicleMainImg}
              id={vehicle._id}
            />
          ))}
        </div>
      </div>
      <RentCarAd />
    </div>
  );
};

export default VehicleHome;