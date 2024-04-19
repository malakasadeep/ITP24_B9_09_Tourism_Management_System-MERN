import VehicleHero from "../../components/VehicleManagement/VehicleHero";
import SearchBar from "../../components/VehicleManagement/SearchBar";
import VehicleListHeader from "../../components/VehicleManagement/VehicleListHeader";
import RentCarAd from "../../components/VehicleManagement/RentCarAd";
import { useLocation, useNavigate } from "react-router-dom";
import VehicleCard from "../../components/VehicleManagement/VehicleCard";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API requests

const VehicleHome = () => {
  
  /*const location = useLocation();
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

  console.log("data:", data);*/
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    usertype: "all",
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    //const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const location = urlParams.get("location") || "all";
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";
    setSearchData({ type, location, sort, order });

    const fetchVehi = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/vehicle/find?${searchQuery}`);
      const data = await res.json();
      setVehicles(data);
      setLoading(false);
    };
    fetchVehi();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.type === "select-one") {
      setSearchData({ ...searchData, type: e.target.value });
    }
    if (e.target.id === "location") {
      setSearchData({ ...searchData, location: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParame = new URLSearchParams();
    urlParame.set("location", searchData.location);
    urlParame.set("type", searchData.type);
    const searchQuery = urlParame.toString();
    navigate(`/vehicles?${searchQuery}`);
  };

  return (
    <div>
      <VehicleHero />
      <div className='bg-white mt-4 lg:mt-[-52px] px-8 shadow-lg max-w-[750px] p-4 lg:text-left text-center h-full items-center mx-auto rounded-lg'>
            <div className='flex flex-col lg:flex-row justify-between px-4'>
                <div className='flex flex-col'>
                    <label htmlFor='vehicleType' className='py-3'>Vehicle Type</label>
                    <select className='p-3 border rounded-md w-full' onChange={handleChange} id="type" > 
                        <option value=''>All</option>
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
                    <label htmlFor='pickupLocation' className='py-3'>Pick-up Location</label>
                    <input type='text' list='city' className='border rounded-md p-3 lg:w-[300px] w-full' placeholder='Colombo' onChange={handleChange}
            id="location" ></input>
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
            </div>
            <button onClick={handleSubmit} className='bg-[#989999] text-white rounded-md font-medium py-3 w-full'>Search</button>
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