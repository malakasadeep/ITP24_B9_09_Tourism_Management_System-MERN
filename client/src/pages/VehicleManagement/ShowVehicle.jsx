import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../components/VehicleManagement/BackButton";

const ShowVehicle = () => {
  const [vehicle, setVehicle] = useState(null); // Change initial state to null
  const { id } = useParams();

  console.log(vehicle);

  useEffect(() => {
    axios
      .get(`/api/vehicle/get-vehi/${id}`)
      .then((res) => {
        setVehicle(res.data);
        console.log(res.data);
        // console.log(data.vehicleMainImg)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4 mt-28">Vehicle Details</h1>
      <div className="flex flex-row gap-10 ">
        <div>
          <img
            src={vehicle?.imageUrls[0]}
            alt="vehMainImg"
            className="w-[320px] md:w-[700px] lg:w-[600px] rounded-lg mt-20"
          />
          <p className="p-5 text-3xl text-blue-800">
            {" "}
            {vehicle?.brand} {vehicle?.model}
          </p>
        </div>
        <div>
          {vehicle ? (
            <div className="flex justify-center items-center w-full flex-col lg:flex-row pt-12 lg:pt-0">
              <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[700px] p-4">
                <div className="my-4">
                  <span className="font-bold">Owner Name:</span>
                  <p className="text-green-900 font-bold">
                    {vehicle.ownername}
                  </p>
                </div>
                <div className="my-4">
                  <span className="font-bold">Brand:</span>
                  <span>{vehicle.brand}</span>
                </div>
                <div className="my-4">
                  <span className="font-bold">Model:</span>
                  <span>{vehicle.model}</span>
                </div>
                <div className="my-4">
                  <span className="font-bold">Vehicle type:</span>
                  <span>{vehicle.type}</span>
                </div>
                <div className="my-4">
                  <span className="font-bold">Register no:</span>
                  <span>{vehicle.regno}</span>
                </div>
                <div className="my-4">
                  <span className="font-bold">Seats:</span>
                  <span>{vehicle.seats}</span>
                </div>
                <div className="my-4">
                  <span className="font-bold">Transmission type:</span>
                  <span>{vehicle.transmission}</span>
                </div>
                <div className="my-4">
                  <span className="font-bold">Price:</span>
                  <span>$ {vehicle.price}</span>
                </div>
                <div className="my-4">
                  <span className="font-bold">Description:</span>
                  <span>{vehicle.description}</span>
                </div>
                <div className="my-4">
                  <span className="font-bold">location:</span>
                  <span>{vehicle.location}</span>
                </div>
              </div>
            </div> // Add closing parenthesis here
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowVehicle;
