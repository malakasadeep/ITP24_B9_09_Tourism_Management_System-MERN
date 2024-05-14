import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdInfo } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import "../../assets/css/user/userList.css";
import VehicleReport from "./VehicleReport";
import Swal from "sweetalert2";
import loadingimg from "../../assets/img/loading.gif";
import axios from 'axios';

export const VehicleList = () => {
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
      navigate(`/admin/vehicle?${urlParams}`);
      fetchVehicles();
  };


  const handleUserDelete = async (vehicleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", 
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
      input: 'text', // Add an input field
      inputPlaceholder: 'Enter reason for rejection' // Placeholder for the input field
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reason = result.value; // Retrieve the reason entered by the user
        try {
          const res = await fetch(`/api/vehicle/delete/${vehicleId}`, {
            method: "DELETE",
            body: JSON.stringify({ reason }), // Pass the reason in the request body
            headers: {
              "Content-Type": "application/json"
            }
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          // Send email to user with the reason for rejection
          await fetch(`/api/send-email`, {
            method: "POST",
            body: JSON.stringify({ userId: userId, reason: reason }), // Pass user ID and reason in the request body
            headers: {
              "Content-Type": "application/json"
            }
          });
          Swal.fire({
            title: "Rejected!",
            text: "Vehicle has been rejected.",
            icon: "success",
          }).then(() => {
            // Remove the deleted vehicle from the list displayed on the UI
            setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle._id !== vehicleId));
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    });
    
    
  };

  return (
    <div>
      <div className="list--header">
        <div className="user--title">
          <h1>Vehicles Management</h1>
          <div className="user--btn">
            <VehicleReport vehicles={vehicles} />
          </div>
        </div>
        <br /> 
          <div className='search--line'>
                          <label htmlFor='location' className='py-3'>Pick-up Location</label>
                          <input type='text' list='city' className='border rounded-md p-3 lg:w-[300px] w-full' placeholder='Colombo' onChange={handleChange} id="location" name="location" />
                          <datalist id='city'>
                          <option value='all' />
                              <option value='Colombo' />
                              <option value='Galle' />
                              <option value='Matara' />
                              <option value='Mount Lavinia' />
                              <option value='Kandy' />
                              <option value='Katunayake Airport' />
                              <option value='Negombo' />
                          </datalist>
                      
          <button
            onClick={handleSubmit}
            className="bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16"
          >
            Search
          </button>
        </div>

        <div class="list--container">
          {!loading && vehicles.length === 0 && (
            <p className="text-2xl text-center p-5 text-blue-950">
              No Users found
            </p>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center">
              <img src={loadingimg} alt="loading" className="w-28" />
              <p className="text-lg w-full text-center">Loading....</p>
            </div>
          )}
          {!loading && vehicles.length > 0 && (
            <table class="list">
              <tbody className="text-center items-center">
                <tr className="font-semibold text-blue-900 text-lg text-center">
                  <td>Vehicle</td>
                  <td>Type</td>
                  <td>Owner Name</td>
                  <td>Reg.No</td>
                  <td>Location</td>
                  <td>Seats</td>
                  <td>Price</td>
                  <td>Action</td>
                </tr>

                {vehicles.map((vehicles) => (
                  <tr className="w-1/2 mx-auto text-center" key={vehicles._id}>
                    <td className="w-full">
                      <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center">
                          <img
                            src={vehicles.imageUrls[0]}
                            alt=""
                            className="h-20 w-20 object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="">{vehicles.brand } {vehicles.model}</h2>
                        </div>
                      </div>
                    </td>
                    <td>{vehicles.type}</td>
                    <td>{vehicles.ownername}</td>
                    <td>{vehicles.regno}</td>
                    <td>{vehicles.location}</td>
                    <td>{vehicles.seats}</td>
                    <td>{vehicles.price}</td>
                    <td className="">
                    <div className="flex gap-2">
                        <Link
                          to={`/admin/vehicle/get/${vehicles._id}`}
                          className="p-2 bg-blue-700 rounded-lg text-white"
                        >
                          <MdInfo className="text-2xl" />
                        </Link>
                        <Link
                          to={`/admin/vehicle/update/${vehicles._id}`}
                          className="p-2 bg-green-700 rounded-lg text-white"
                        >
                          <FaEdit className="text-2xl" />
                        </Link>
                        <button
                          className="p-2 bg-red-700 rounded-lg text-white"
                           onClick={() => handleUserDelete(vehicles._id)}
                              >
                            Reject <MdDeleteForever className="text-2xl" />
                        </button>

                      </div>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
