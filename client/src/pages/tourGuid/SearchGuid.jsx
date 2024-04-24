import { useEffect, useState } from "react";
//import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/img/guid.jpg";

const Guid = ({ id, name, description, email, address, image }) => {
  const navigate = useNavigate();
  const truncatedDescription = description.substring(0, 100) + "...";
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md mb-4 flex items-center">
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={`Image for ${name}`}
          className="rounded-full"
          width={"200px"}
          height={"200px"}
        />
      </div>
      <div className="ml-4">
        <h2
          onClick={() => {
            navigate(`/guiding/${id}`);
          }}
          className="text-lg font-bold mb-2 text-gray-800 hover:text-blue-500 cursor-pointer"
        >
          {name}
        </h2>
        <p className="text-gray-700 mb-2">{truncatedDescription}</p>
        <p className="text-gray-700">{email}</p>
        <p className="text-gray-700">{address}</p>
      </div>
    </div>
  );
};

const GuidList = ({ guides }) => {
  console.log(guides);
  return (
    <div>
      {guides.map((guid) => (
        <Guid
          key={guid._id}
          id={guid._id}
          name={guid.name}
          description={guid.description}
          email={guid.email}
          address={guid.address}
          image={guid.images[0]}
        />
      ))}
    </div>
  );
};

export default function SearchGuid() {
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
    const language = urlParams.get("language") || "all";
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";
    setSearchData({
      searchTerm,
      language,
      sort,
      order,
    });

    const fetchGuid = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/tour-guide/search-guid?${searchQuery}`);
      const data = await res.json();
      setguides(data);
      console.log(data);
      setLoading(false);
    };
    fetchGuid();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "language") {
      setSearchData({ ...searchData, language: e.target.value });
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
    urlParame.set("language", searchData.language);
    urlParame.set("sort", searchData.sort);
    urlParame.set("order", searchData.order);
    const searchQuery = urlParame.toString();
    navigate(`/guid/search?${searchQuery}`);
  };
  return (
    <div className="mt-28">
      {" "}
      <div className="bg-cover bg-center">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-[#DEEFFF] flex items-center justify-center w-full flex-col lg:flex-row">
            <div className="p-8 pt-5 md:p-24 md:pt-5 lg:p-5">
              <h1 className="text-3xl md:text-3xl font-bold uppercase text-[#272727] mb-10">
                Find the
                <span className="text-[#41A4FF]"> Tour Guie</span>
                <br />
                for your next stay today!
                <span className="text-2xl block md:text-3xl font-bold uppercase text-[#272727]">
                  Explore our Guides
                </span>
              </h1>
              <div className="mb-4">
                <input
                  className="border rounded-lg px-4 py-2 w-full mb-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ width: "700px" }}
                  type="text"
                  placeholder="Search Guide"
                  onChange={handleChange}
                  id="searchTerm"
                />
              </div>
            </div>
            <div className="p-8">
              <img
                src={backgroundImage}
                alt="image-description"
                style={{ borderRadius: "10px", width: "500px", height: "auto" }}
              />
            </div>
          </div>
        </div>
        <div
          className="flex max-w-7xl mx-auto p-4 gap-10 mt-10"
          style={{ marginBottom: "20rem" }}
        >
          <div className="w-1/3 pr-4 ">
            <h2 className="text-lg font-semibold mb-2">Filter Guides</h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Language</label>
              <select
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="language"
                onChange={handleChange}
              >
                <option value="">Language</option>
                <option value="all">All</option>
                <option value="Sinhala">Sinhala</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Arab">Arab</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Address</label>
              <input className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
          <div className="w-3/4 ">
            {loading ? (
              <div className="flex items-center justify-center">
                {/* <CircularProgress /> */}
              </div>
            ) : (
              <>
                {guides.length > 0 ? (
                  <GuidList guides={guides} />
                ) : (
                  <p>No activities found.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
