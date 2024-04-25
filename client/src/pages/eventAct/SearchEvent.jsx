import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/img/event/event.jpg";
import { EventCard } from "../../components/eventAct/EventCard";

const ActivityList = ({ events }) => {
  console.log(events);
  return (
    <div className="grid grid-cols-3 gap-10">
      {events.map((event) => (
        <div key={event._id}>
          <EventCard
            id={event._id}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            price={event.price}
            type={event.type}
            time={event.time}
            image={event.imageUrls[0]}
          />
        </div>
      ))}
    </div>
  );
};

export default function SearchEvent() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    location: "all",
    type: "all",
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const location = urlParams.get("location") || "all";
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";
    setSearchData({ searchTerm, type, location, sort, order });

    const fetchEvent = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/events/search/get?${searchQuery}`);
      const data = await res.json();
      setEvents(data);
      console.log(data);
      setLoading(false);
    };
    fetchEvent();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.type === "select-one") {
      setSearchData({ ...searchData, type: e.target.value });
    }
    if (e.target.type === "select-one") {
      setSearchData({ ...searchData, location: e.target.value });
    }
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParame = new URLSearchParams();
    urlParame.set("searchTerm", searchData.searchTerm);
    urlParame.set("type", searchData.type);
    urlParame.set("location", searchData.location);
    const searchQuery = urlParame.toString();
    navigate(`/events/search?${searchQuery}`);
  };

  return (
    <div className="bg-cover bg-center">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "120px",
        }}
      >
        <div className="bg-[#DEEFFF] flex items-center justify-center w-full flex-col lg:flex-row ">
          <div className="p-8 pt-5 md:p-24 md:pt-5 lg:p-5  ">
            <h1 className="text-3xl md:text-3xl font-bold uppercase text-[#272727]">
              Find the
              <span className="text-[#41A4FF]"> Special Activity</span>
              <br />
              for your next stay today!
              <span className="text-2xl block md:text-3xl font-bold uppercase text-[#272727]">
                Explore our activities
              </span>
            </h1>
            <div className="mb-1">
              <input
                className="border rounded-lg px-4 py-2 w-full mb-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: "700px" }}
                type="text"
                placeholder="Search activities"
                onChange={handleChange}
                id="searchTerm"
              />
            </div>
          </div>
          <div className="p-4">
            <img
              src={backgroundImage}
              alt="image-description"
              style={{ borderRadius: "10px", width: "500px", height: "auto" }}
            />
          </div>
        </div>
      </div>
      <div
        className="flex max-w-7xl mx-auto  mt-10"
        style={{ marginBottom: "20rem" }}
      >
        <div className="w-1/5 pr-4 ">
          <h2 className="text-lg font-semibold mb-2">Filter Activities</h2>
          <div className="mb-4">
            <label className="block font-medium mb-2">Location</label>
            <select
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="location"
              onChange={handleChange}
            >
              <option value="all">ALL</option>
              <option value="Colombo">Colombo</option>
              <option value="Galle">Galle</option>
              <option value="Kandy">Kandy</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Matara">Matara</option>
              <option value="Negombo">Negombo</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Activity Type</label>
            <select
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="type"
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="Activity">Activity</option>
              <option value="Event">Event</option>
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
        <div className="w-5/6">
          {loading ? (
            <div className="flex items-center justify-cente">
              {/* <CircularProgress /> */}
            </div>
          ) : (
            <>
              {events.length > 0 ? (
                <div className="">
                  <ActivityList events={events} />
                </div>
              ) : (
                <p>No activities found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
