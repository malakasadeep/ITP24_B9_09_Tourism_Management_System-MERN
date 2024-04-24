import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdInfo } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "../../assets/css/user/userList.css";
import { MdDeleteForever } from "react-icons/md";
//import loadingimg from "../../assets/img/loading.gif";
//import PackageReport from "./PackageReport";
import Swal from "sweetalert2";
import GuidReport from "./GuidReport";

export default function GuidList() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [guides, setguides] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";
    setSearchData({
      searchTerm,
      type,
      sort,
      order,
    });

    const fetchGuid = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/tour-guide/search-guid?${searchQuery}`);
      const data = await res.json();
      setguides(data);
      setLoading(false);
    };
    fetchGuid();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "type") {
      setSearchData({ ...searchData, type: e.target.value });
    }
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParame = new URLSearchParams();
    urlParame.set("searchTerm", searchData.searchTerm);
    urlParame.set("type", searchData.type);
    urlParame.set("sort", searchData.sort);
    urlParame.set("order", searchData.order);
    const searchQuery = urlParame.toString();
    navigate(`/admin/guid?${searchQuery}`);
  };

  function truncateTitle(title) {
    const words = title.split(" ");
    if (words.length <= 2) {
      return title;
    }
    return `${words.slice(0, 2).join(" ")} ...`;
  }

  const handleGuidDelete = async (guidID) => {
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
          const res = await fetch(`/api/tour-guide/delete/${guidID}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          Swal.fire({
            title: "Deleted!",
            text: "Guid has been deleted.",
            icon: "success",
          });
          setguides((prev) => prev.filter((guid) => guid._id !== guidID));
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
          <h1>Tour Guid Management</h1>
          <div className="user--btn ml-60">
            <GuidReport guides={guides} />
          </div>
        </div>
        <br />
        <div className="search--line">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            id="searchTerm"
          />
          <button
            onClick={handleSubmit}
            className="bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16"
          >
            Search
          </button>
        </div>

        <div class="list--container">
          {!loading && guides.length === 0 && (
            <p className="text-2xl text-center p-5 text-blue-950">
              No Guides found
            </p>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center">
              {/*<img src={loadingimg} alt="loading" className="w-28" />*/}
              <p className="text-lg w-full text-center">Loading....</p>
            </div>
          )}
          {!loading && guides.length > 0 && (
            <table class="list">
              <tbody className="text-center items-center">
                <tr className="font-semibold text-blue-900 text-lg text-center">
                  <td>Guid</td>
                  <td>Language</td>
                  <td>Email</td>
                  <td>NIC</td>
                  <td>Address</td>
                  <td>Actions</td>
                </tr>

                {guides.map((guid) => (
                  <tr className="w-1/2 mx-auto text-center" key={guid._id}>
                    <td className="w-full">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center">
                          <img
                            src={guid.images[0]}
                            alt=""
                            className="h-20 w-20 object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="">{truncateTitle(guid.name)}</h2>
                        </div>
                      </div>
                    </td>
                    <td>{guid.language}</td>
                    <td>{guid.email}</td>
                    <td>{guid.NIC}</td>
                    <td>
                      <h2 className="truncate">
                        {truncateTitle(guid.address)}
                      </h2>
                    </td>

                    <td className="">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/guid/${guid._id}`}
                          className="p-2 bg-blue-700 rounded-lg text-white"
                        >
                          <MdInfo className="text-2xl" />
                        </Link>
                        <Link
                          to={`/admin/guid/update/${guid._id}`}
                          className="p-2 bg-green-700 rounded-lg text-white"
                        >
                          <FaEdit className="text-2xl" />
                        </Link>
                        <button
                          className="p-2 bg-red-700 rounded-lg text-white"
                          onClick={() => handleGuidDelete(guid._id)}
                        >
                          <MdDeleteForever className="text-2xl" />
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
}
