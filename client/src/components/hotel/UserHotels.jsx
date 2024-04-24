import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoChevronDownCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import tour_pkg from "../../assets/img/icons/tour_pkg.png";
import Swal from "sweetalert2";

export default function UserHotels() {
  const [showHotelError, setShowHotelError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userHotels, setUserHotels] = useState([]);
  const [hotelsLoaded, setHotelsLoaded] = useState(false);

  const handleShowHotels = async () => {
    try {
      setShowHotelError(false);
      const res = await fetch(`/api/user/hotels/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowHotelError(true);
        return;
      }

      setUserHotels(data);
      setHotelsLoaded(true);
    } catch (error) {
      setShowHotelError(true);
    }
  };

  const handleHotelDelete = async (hotelId) => {
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
          const res = await fetch(`/api/hotel/delete/${hotelId}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          Swal.fire({
            title: "Deleted!",
            text: "Your package has been deleted.",
            icon: "success",
          });
          setUserHotels((prev) =>
            prev.filter((hotel) => hotel._id !== hotelId)
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
            My Hotels <IoChevronDownCircle />
          </h5>
        </div>
        <button
          onClick={handleShowHotels}
          className="text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95 transition-all duration-200 ease-out "
        >
          Explore{" "}
        </button>
        <p className="text-red-700 mt-5">
          {showHotelError && "Error showing listings"}
        </p>
        {hotelsLoaded && userHotels.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-7 text-4xl font-extralight">
              Your Hotels
            </h1>
            {userHotels.map((hotel) => (
              <div
                key={hotel._id}
                className="border border-blue-600 rounded-lg p-3 flex justify-between items-center gap-4 transition duration-300 ease-in-out hover:scale-105"
              >
                <Link to={`/listing/${hotel._id}`}>
                  <img
                    src={hotel.hotelImgs[0]}
                    alt="listing cover"
                    className="h-20 w-20 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                  to={`/my-hotels/${hotel._id}`}
                >
                  <p className="text-2lg">{hotel.title}</p>
                </Link>

                <div className="flex flex-row item-center gap-4">
                  <button
                    onClick={() => handleHotelDelete(hotel._id)}
                    className="text-red-700  text-4xl hover:text-red-400 focus:scale-95 transition-all duration-200 ease-out "
                  >
                    {" "}
                    <MdDeleteOutline />
                  </button>
                  <Link to={`/update-hotel/${hotel._id}`}>
                    <button className="text-green-700 text-4xl hover:text-green-400 focus:scale-95 transition-all duration-200 ease-out ">
                      <FaRegEdit />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : hotelsLoaded ? (
          <div className="text-center mt-7 text-4xl font-extralight">
            {showHotelError ? "Error showing listings" : "No packages found."}
          </div>
        ) : null}
      </div>
    </div>
  );
}
