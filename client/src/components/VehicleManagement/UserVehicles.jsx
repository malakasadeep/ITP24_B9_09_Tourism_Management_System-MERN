import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoChevronDownCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import tour_pkg from "../../assets/img/icons/tour_pkg.png";
import Swal from "sweetalert2";

export default function UserVehicles() {
  const [showVehicleError, setShowVehicleError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userVehicles, setUserVehicles] = useState([]);
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false);

  const handleShowVehicles = async () => {
    try {
      setShowVehicleError(false);
      const res = await fetch(`/api/vehicle/get-vehi/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowVehicleError(true);
        return;
      }

      setUserVehicles(data);
      setVehiclesLoaded(true);
    } catch (error) {
      setShowVehicleError(true);
    }
  };

  const handleVehicleDelete = async (vehicleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/vehicle/delete/${vehicleId}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          Swal.fire({
            title: "Deleted!",
            text: "Your vehicle has been deleted.",
            icon: "success",
          });
          setUserVehicles((prev) =>
            prev.filter((vehicle) => vehicle._id !== vehicleId)
          );
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };
  return (
    <div className="rounded-xl shadow-lg w-100px h-auto bg-white ">
      <div className="p-5 flex flex-col">
        <div className="flex flex-row rounded-xl overflow-hidden items-center gap-5">
          <img src={tour_pkg} alt="" className="w-20 h-20 object-contain" />
          <h5 className="text-blue-900 text-4xl  font-medium text-center flex flex-row items-center gap-5">
            My Vehicles <IoChevronDownCircle />
          </h5>
        </div>
        <button
          onClick={handleShowVehicles}
          className="text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out "
        >
          Explore{" "}
        </button>
        <p className="text-red-700 mt-5">
          {showVehicleError && "Error showing listings"}
        </p>
        {vehiclesLoaded && userVehicles.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-7 text-4xl font-extralight">
              Your Vehicles
            </h1>
            {userVehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="border border-blue-600 rounded-lg p-3 flex justify-between items-center gap-4 transition duration-300 ease-in-out hover:scale-105"
              >
                <Link to={`/listing/${vehicle._id}`}>
                  <img
                    src={vehicle.imageUrls[0]}
                    alt="listing cover"
                    className="h-20 w-20 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                  to={`/Vehicle/${vehicle._id}`}
                >
                  <p className="text-2lg">{vehicle.regno}</p>
                </Link>

                <div className="flex flex-row item-center gap-4">
                  <button
                    onClick={() => handleVehicleDelete(vehicle._id)}
                    className="text-red-700  text-4xl hover:text-red-400 focus:scale-95 transition-all duration-200 ease-out "
                  >
                    {" "}
                    <MdDeleteOutline />
                  </button>
                  <Link to={`Vehicle/update/${vehicle._id}`}>
                    <button className="text-green-700 text-4xl hover:text-green-400 focus:scale-95 transition-all duration-200 ease-out ">
                      <FaRegEdit />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : vehiclesLoaded ? (
          <div className="text-center mt-7 text-4xl font-extralight">
            {showVehicleError ? "Error showing listings" : "No Vehicles found."}
          </div>
        ) : null}
      </div>
    </div>
  );
}
