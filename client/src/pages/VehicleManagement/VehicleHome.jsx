import VehicleHero from "../../components/VehicleManagement/VehicleHero";
import SearchBar from "../../components/VehicleManagement/SearchBar";
import VehicleListHeader from "../../components/VehicleManagement/VehicleListHeader";
import RentCarAd from "../../components/VehicleManagement/RentCarAd";
import { useNavigate, useLocation } from "react-router-dom";
import VehicleCard from "../../components/VehicleManagement/VehicleCard";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VehicleHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initial state setup for search parameters and vehicle data
  const urlParams = new URLSearchParams(location.search); // Create an instance of URLSearchParams
  const [searchData, setSearchData] = useState({
      type: urlParams.get('type') || 'all',
      location: urlParams.get('location') || 'all',
      sort: urlParams.get('sort') || 'created_at',
      order: urlParams.get('order') || 'desc',
  });
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce function to delay search request
  const debounce = (func, delay) => {
      let timer;
      return function() {
          clearTimeout(timer);
          timer = setTimeout(() => func.apply(this, arguments), delay);
      };
  };

  // Fetch vehicles based on search data
  const fetchVehicles = debounce(async () => {
      setLoading(true);
      try {
          const urlParams = new URLSearchParams(searchData).toString();
          const response = await axios.get(`/api/vehicle/find?${urlParams}`);
          setVehicles(response.data);
          setError(null);
      } catch (err) {
          setError("Failed to fetch vehicles. Please try again.");
          console.error(err);
      } finally {
          setLoading(false);
      }
  }, 300);

  useEffect(() => {
      fetchVehicles();
  }, [searchData]);

  // Handler for search form changes
  const handleChange = (e) => {
      const { id, value, type } = e.target;
      const field = id || e.target.name; // Use id or name as the field identifier

      setSearchData(prevSearchData => ({
          ...prevSearchData,
          [field]: value
      }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(searchData).toString();
      navigate(`/vehicles?${urlParams}`);
      fetchVehicles();
  };

  return (
      <div>
          <VehicleHero />
          <div className='bg-white mt-4 lg:mt-[-52px] px-8 shadow-lg max-w-[750px] p-4 lg:text-left text-center h-full items-center mx-auto rounded-lg'>
              <form onSubmit={handleSubmit}>
                  <div className='flex flex-col lg:flex-row justify-between px-4'>
                      <div className='flex flex-col'>
                          <label htmlFor='type' className='py-3'>Vehicle Type</label>
                          <select className='p-3 border rounded-md w-full' onChange={handleChange} id="type" name="type">
                              <option value='all'>All</option>
                              <option value='E-Vehicles'>E-Vehicles</option>
                              <option value='Car'>Car</option>
                              <option value='SUV'>SUV</option>
                              <option value='Van'>Van</option>
                              <option value='Motor Bike'>Motor Bike</option>
                              <option value='Tuk Tuk'>Tuk Tuk</option>
                              <option value='Bus'>Bus</option>
                          </select>
                      </div>

                      <div className='flex flex-col pl-16'>
                          <label htmlFor='location' className='py-3'>Pick-up Location</label>
                          <input type='text' list='city' className='border rounded-md p-3 lg:w-[300px] w-full' placeholder='Colombo' onChange={handleChange} id="location" name="location" />
                          <datalist id='city'>
                              <option value='Colombo' />
                              <option value='Galle' />
                              <option value='Matara' />
                              <option value='Mount Lavinia' />
                              <option value='Kandy' />
                              <option value='Katunayake Airport' />
                              <option value='Negombo' />
                          </datalist>
                      </div>

                      {/* Add other filters here as necessary */}
                  </div>
                  {/* <button type='submit' className='bg-[#989999] text-white rounded-md font-medium py-3 w-full'>Search</button> */}
              </form>
          </div>

          {loading && (
              <div className="text-center mt-4">Loading...</div>
          )}
          
          {error && (
              <div className="text-center text-red-500 mt-4">{error}</div>
          )}

          <VehicleListHeader />
          <div className="md:px-24">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {vehicles.map((vehicle) => (
                      <VehicleCard
                          key={vehicle._id}
                          brand={vehicle.brand}
                          image={vehicle.imageUrls[0]}
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
