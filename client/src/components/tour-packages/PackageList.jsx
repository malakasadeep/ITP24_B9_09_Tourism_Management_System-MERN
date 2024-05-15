import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdInfo } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import loadingimg from "../../assets/img/loading.gif";
import PackageReport from "./PackageReport";
import Swal from "sweetalert2";

export default function PackageList() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    dining: false,
    transport: false,
    hoteltype: "all",
    days: 0,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const offer = urlParams.get("offer") || false;
    const dining = urlParams.get("dining") || false;
    const transport = urlParams.get("transport") || false;
    const hoteltype = urlParams.get("hoteltype") || "all";
    const days = urlParams.get("days") || 0;
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";
    setSearchData({
      searchTerm,
      type,
      offer,
      dining,
      transport,
      hoteltype,
      days,
      sort,
      order,
    });

    const fetchPkg = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/Package/getpkgs?${searchQuery}`);
      const data = await res.json();
      setPackages(data);
      setLoading(false);
    };
    fetchPkg();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "reguler" ||
      e.target.id === "couple" ||
      e.target.id === "family"
    ) {
      setSearchData({ ...searchData, type: e.target.id });
    }
    if (
      e.target.id === "dining" ||
      e.target.id === "transport" ||
      e.target.id === "offer"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (
      e.target.id === "3 Star Hotel" ||
      e.target.id === "4 Star Hotel" ||
      e.target.id === "5 Star Hotel"
    ) {
      setSearchData({ ...searchData, hoteltype: e.target.id });
    }
    if (e.target.id === "days") {
      setSearchData({ ...searchData, days: e.target.value });
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
    urlParame.set("offer", searchData.offer);
    urlParame.set("dining", searchData.dining);
    urlParame.set("transport", searchData.transport);
    urlParame.set("hoteltype", searchData.hoteltype);
    urlParame.set("days", searchData.days);
    urlParame.set("sort", searchData.sort);
    urlParame.set("order", searchData.order);
    const searchQuery = urlParame.toString();
    navigate(`/admin/packages?${searchQuery}`);
  };

  function truncateTitle(title) {
    const words = title.split(" ");
    if (words.length <= 2) {
      return title;
    }
    return `${words.slice(0, 2).join(" ")} ...`;
  }

  const handlePackageDelete = async (packageId) => {
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
          const res = await fetch(`/api/Package/delete/${packageId}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          Swal.fire({
            title: "Deleted!",
            text: "Package has been deleted.",
            icon: "success",
          });
          setPackages((prev) => prev.filter((pkg) => pkg._id !== packageId));
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
          <h1>Tour Package Management</h1>
          <div className="user--btn ml-60">
            <PackageReport packages={packages} />
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
          {!loading && packages.length === 0 && (
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
          {!loading && packages.length > 0 && (
            <table class="list">
              <tbody className="text-center items-center">
                <tr className="font-semibold text-blue-900 text-lg text-center">
                  <td>Package</td>
                  <td>Category</td>
                  <td>Type</td>
                  <td>Days</td>
                  <td>Hotels</td>
                  <td>Citys</td>
                  <td>Price</td>
                  <td>Offer</td>
                  <td>Actions</td>
                </tr>

                {packages.map((pkg) => (
                  <tr className="w-1/2 mx-auto text-center" key={pkg._id}>
                    <td className="w-full">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center">
                          <img
                            src={pkg.imageUrls[0]}
                            alt=""
                            className="h-20 w-20 object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="">{truncateTitle(pkg.title)}</h2>
                        </div>
                      </div>
                    </td>
                    <td>{pkg.category}</td>
                    <td>{pkg.type}</td>
                    <td>{pkg.days}</td>
                    <td>{pkg.noofhotels}</td>
                    <td>
                      <h2 className="truncate">{truncateTitle(pkg.citys)}</h2>
                    </td>
                    <td>${pkg.price}</td>
                    <td>{pkg.offer.toString()}</td>

                    <td className="">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/packages/${pkg._id}`}
                          className="p-2 bg-blue-700 rounded-lg text-white"
                        >
                          <MdInfo className="text-2xl" />
                        </Link>
                        <Link
                          to={`/admin/packages/update/${pkg._id}`}
                          className="p-2 bg-green-700 rounded-lg text-white"
                        >
                          <FaEdit className="text-2xl" />
                        </Link>
                        <button
                          className="p-2 bg-red-700 rounded-lg text-white"
                          onClick={() => handlePackageDelete(pkg._id)}
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
