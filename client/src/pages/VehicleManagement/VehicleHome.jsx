import VehicleHero from "../../components/VehicleManagement/VehicleHero";
import SearchBar from "../../components/VehicleManagement/SearchBar";
// import VehicleListHeader from "../../components/VehicleManagement/VehicleListHeader";
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
      <SearchBar />
      {/* <VehicleListHeader /> */}
      <div className="md:px-24">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {vehicles.map((vehicle) => ( // Mapping over vehicles instead of data
            <VehicleCard
              key={vehicle._id} // Ensure each child in a list has a unique "key" prop
              brand={vehicle.brand}
              model={vehicle.model}
              price={vehicle.price}
              transmissionType={vehicle.transmissionType}
              fuelType={vehicle.fuelType}
              capacity={vehicle.capacity}
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