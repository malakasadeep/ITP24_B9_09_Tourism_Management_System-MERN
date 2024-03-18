import React,{useEffect,useState} from 'react'
import axios from 'axios';
import{Link} from 'react-router-dom';
import Swal from 'sweetalert2';


function Vehicle() {
  const[vehicles,setVehicles]=useState([]);
  const[loading,setLoading]=useState(false);
  useEffect(()=>{
  setLoading(true);
   axios
  .get('/api/vehicle')
  .then((res)=>{
    setVehicles(res.data);
    setLoading(false);
  })
  
  .catch((error) => { 
  console.log(error);
  setLoading(false);
  });
  },[]); 

  const handleVehicleDelete = async (vehicleId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
  
          try {
  
            const res = await fetch(`/api/vehicle/delete/${vehicleId}`,{
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            Swal.fire({
              title: "Deleted!",
              text: "Your package has been deleted.",
              icon: "success"
            });
            setUserPackages((prev)=> prev.filter((vehicles)=> vehicles._id !== packageId));
          } catch (error) {
            console.log(error.message);
          } 
        }
      });
  };
  
  return (
    <div>
    
      <div className="md:px-24">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Vehicle Management</h1>
          <Link to="/Vehicle/add" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Vehicle</Link>
        </div>
        <div className="flex justify-center">
          <table className="table-auto w-full mt-8"> 
            <thead>
              <tr>
                <th className="px-4 py-2">Register Number</th>
                <th className="px-4 py-2">Vehicle model</th>
                <th className="px-4 py-2">Vehicle Type</th>
                <th className="px-4 py-2">Vehicle location</th>
                <th className="px-4 py-2">fuelType</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                vehicles.map((vehicle) => (
                  <tr key={vehicle._id}>
                    <td className="border px-4 py-2">{vehicle.registerNumber}</td>
                    <td className="border px-4 py-2">{vehicle.model}</td>
                    <td className="border px-4 py-2">{vehicle.type}</td>
                    <td className="border px-4 py-2">{vehicle.location}</td>
                    <td className="border px-4 py-2">{vehicle.fuelType}</td>
                    <td className="border px-4 py-2">
                      <Link to={`/vehicle/get/${vehicle._id}`} className="px-4 py-2 bg-green-500 text-white rounded-md">Show</Link>
                      <Link to={`/vehicle/update/${vehicle._id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md">Edit</Link>
                      <Link onClick={()=>handleVehicleDelete(vehicle._id)} className="px-4 py-2 bg-red-500 text-white rounded-md ml-2">Delete</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  }

export default Vehicle;



