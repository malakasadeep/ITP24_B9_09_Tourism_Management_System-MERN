import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronDownCircle } from "react-icons/io5";
// import hotel from "../assets/img/icons/hotel.png";
// import restaurant from "../assets/img/icons/restaurant.png";
// import vehicle from "../assets/img/icons/vehicle.png";
// import event from "../assets/img/icons/event.png";
// import tour_agent from "../assets/img/icons/tour-agent.png";

import UserPackages from "../components/tour-packages/UserPackages";

import UserHotels from "../components/hotel/UserHotels";
import UserVehicles from "../components/VehicleManagement/UserVehicles";
import UserEvents from "../components/eventAct/UserEvents";

export default function ListedItems() {
  return (
    <div className="flex items-center justify-center mt-32 container mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-14  ">
        <UserPackages />
        <UserHotels/>
        <UserVehicles/>
        <UserEvents />

        {/* <div className="rounded-xl shadow-lg w-100px h-auto bg-white ">
          <div className="p-5 flex flex-col">
            <div className="flex flex-row  overflow-hidden items-center gap-5">
              <img src={hotel} alt="" className="w-20 h-20 object-contain" />
              <h5 className="text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5">
                My Hotel and Residence <IoChevronDownCircle />
              </h5>
            </div>
            <button className="text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out ">
              Explore{" "}
            </button>
          </div>
        </div>

        <div className="rounded-xl shadow-lg w-100px h-auto bg-white ">
          <div className="p-5 flex flex-col">
            <div className="flex flex-row  overflow-hidden items-center gap-5">
              <img
                src={restaurant}
                alt=""
                className="w-20 h-20 object-contain"
              />
              <h5 className="text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5">
                My Restaurants <IoChevronDownCircle />
              </h5>
            </div>
            <button className="text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out ">
              Explore{" "}
            </button>
          </div>
        </div>

        <div className="rounded-xl shadow-lg w-100px h-auto bg-white ">
          <div className="p-5 flex flex-col">
            <div className="flex flex-row  overflow-hidden items-center gap-5">
              <img src={vehicle} alt="" className="w-20 h-20 object-contain" />
              <h5 className="text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5">
                My Vehicles <IoChevronDownCircle />
              </h5>
            </div>
            <button className="text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out ">
              Explore{" "}
            </button>
          </div>
        </div>

        <div className="rounded-xl shadow-lg w-100px h-auto bg-white ">
          <div className="p-5 flex flex-col">
            <div className="flex flex-row  overflow-hidden items-center gap-5">
              <img src={event} alt="" className="w-20 h-20 object-contain" />
              <h5 className="text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5">
                My Events and Activities <IoChevronDownCircle />
              </h5>
            </div>
            <Link
              to="/events/admin"
              className="text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out "
            >
              <button>Explore </button>
            </Link>
          </div>
        </div>

        <div className="rounded-xl shadow-lg w-100px h-auto bg-white ">
          <div className="p-5 flex flex-col">
            <div className="flex flex-row  overflow-hidden items-center gap-5">
              <img
                src={tour_agent}
                alt=""
                className="w-20 h-20 object-contain"
              />
              <h5 className="text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5">
                My Tour Agent
                <IoChevronDownCircle />
              </h5>
            </div>
            <button className="text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out ">
              Explore{" "}
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}