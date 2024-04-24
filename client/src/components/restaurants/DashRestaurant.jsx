import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function DashRestaurant() {
  const [restaurants, setRestaurants] = useState([]); // Renamed to restaurants for clarity

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get("/api/restaurant");
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this course?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`/api/restaurant/${id}`);
        setRestaurants((currentRestaurants) =>
          currentRestaurants.filter((p) => p._id !== id)
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  function truncateDescription(description, maxLength) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  }

  return (
    <div className="overflow-x-auto mx-auto w-full mr-2 mt-6 ml-2 mb-6">
      <div className="mb-5 ml-1">
        <Link to="/admin/create-res">
          <Button outline>
            <IoIosAddCircleOutline className="mr-2 text-xl" />
            ADD RESTAURANT
          </Button>
        </Link>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
  <thead>
    <tr>
      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant Name</th>
      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant Owner</th>
      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
      <th className="px-6 py-3 bg-gray-50"></th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {restaurants.map((res, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <img
            src={res.image}
            alt={res.restaurantName}
            className="h-12 w-12 rounded-lg"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{res.restaurantName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{res.ownerName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{res.location}</td>
        <td className="px-6 py-4 whitespace-nowrap">{truncateDescription(res.description, 50)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a
            href={`/admin/update-res/${res._id}`}
            className="text-cyan-600 hover:underline"
          >
            Edit
          </a>
          <a
            onClick={() => {
              handleDelete(res._id);
            }}
            className="text-red-600 hover:underline ml-4 cursor-pointer"
          >
            Delete
          </a>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
