import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";
import { MdInfo } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import EventReport from "./EventReport";
import loadingimg from "../../assets/img/loading.gif";

function EventTable() {

  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    usertype: "all",
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";
    setSearchData({ searchTerm, type, sort, order });

    const fetchEvent = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/events/search/get?${searchQuery}`);
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    };
    fetchEvent();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.type === "select-one") {
      setSearchData({ ...searchData, type: e.target.value });
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
    const searchQuery = urlParame.toString();
    navigate(`/admin/events?${searchQuery}`);
  };

  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <div>
          <div className="list--header">
            <div className="user--title">
              <h1>Event and Activity Management</h1>
              <div className="user--btn">
                <EventReport events={events} />
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
              <select
                className="border p-3 rounded-lg ml-5 bg-slate-200"
                name="type"
                id="type"
                required
                onChange={handleChange}
              >
                <option className="text-slate-400" hidden>
                  Type
                </option>
                <option value="all">All</option>
                <option value="Activity">Activity</option>
                <option value="Event">Event</option>
              </select>
              <button
                onClick={handleSubmit}
                className="bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16"
              >
                Search
              </button>
            </div>

            <div className="list--container">
              {!loading && events.length === 0 && (
                <p className="text-2xl text-center p-5 text-blue-950">
                  No Events found
                </p>
              )}
              {loading && (
                <div className="flex flex-col items-center justify-center">
                  <img src={loadingimg} alt="loading" className="w-28" />
                  <p className="text-lg w-full text-center">Loading....</p>
                </div>
              )}
              {!loading && events.length > 0 && (
                <table className="list">
                  <tbody>
                    <tr className="font-semibold text-blue-900 text-lg text-center">
                      <td>Event</td>
                      <td>Type</td>
                      <td>Date</td>
                      <td>Time</td>
                      <td>Location</td>
                      <td>Price</td>
                      <td>Participants</td>
                      <td>Action</td>
                    </tr>
                    {events?.map((event) => (
                      <tr className="text-center" key={event._id}>
                        <td>
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center">
                              <img
                                src={event.imageUrls[0]}
                                alt=""
                                className="h-20 w-20 object-contain"
                              />
                            </div>
                            <div>
                              <h2>{event.title}</h2>
                            </div>
                          </div>
                        </td>
                        <td>{event.type}</td>
                        <td>{event.date?.toString().split("T")[0]}</td>
                        <td>{event.time}</td>
                        <td>{event.location}</td>
                        <td>{event.price}</td>
                        <td>
                          {event.participants}/{event.MaxParticipants}
                        </td>
                        <td className="">
                          <div className="flex">
                            <Link
                              to={`/admin/events/get/${event._id}`}
                              className="btn1"
                            >
                              <MdInfo className="text-2xl" />
                            </Link>
                            <Link
                              to={`/events/update/${event._id}`}
                              className="btnU"
                            >
                              <FaEdit className="text-2xl" />
                            </Link>
                            <button
                              className="btnD"
                              onClick={(e) => handleDelete(event._id)}
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
      </div>
    </div>
  );
}

export default EventTable;
