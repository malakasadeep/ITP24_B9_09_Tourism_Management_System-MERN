import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function DashPackage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get("/api/package");
        setPackages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackages();
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
        const res = await axios.delete(`/api/package/${id}`);
        setPackages((currentPackages) =>
          currentPackages.filter((p) => p._id !== id)
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
    <div className="overflow-x-auto mx-auto w-full mr-2 mt-6 ml-2">
      <div className="mb-5 ml-1">
        <Link to="/admin/create-res-pkg">
          <Button outline className="bg-slate-700">
            <IoIosAddCircleOutline className="mr-2 text-xl " />
            ADD PACKAGE
          </Button>
        </Link>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Package Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Package Details
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {packages.map((pckg, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={pckg.image}
                  alt="package img"
                  className="h-12 w-12 rounded-lg"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {pckg.packageName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {truncateDescription(pckg.packageDetails, 50)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                Rs.{pckg.packagePrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a
                  href={`/admin/update-res-pkg/${pckg._id}`}
                  className="text-cyan-600 hover:underline"
                >
                  Edit
                </a>
                <a
                  onClick={() => {
                    handleDelete(pckg._id);
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