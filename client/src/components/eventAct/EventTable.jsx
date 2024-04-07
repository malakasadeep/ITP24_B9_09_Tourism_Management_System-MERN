import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";
import { MdInfo } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function EventTable() {
  const [events, SetEventTable] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/events")
      .then((result) => SetEventTable(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/api/events/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
              <h1>Event Management</h1>
              <div className="user--btn">
                <button className="btn1">
                  <Link to={`/events/create`}>Add Event</Link>
                </button>
                <button className="btn2">Download Report</button>
              </div>
            </div>
            <br />
            <div className="search--line">
              <input
                type="text"
                placeholder="Search..."
                // onChange={handleChange}
                id="searchTerm"
              />
              <button
                // onClick={handleSubmit}
                className="bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16"
              >
                Search
              </button>
            </div>

            <div className="list--container">
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
                          <Link to={`/event/get/${event._id}`} className="btn1">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventTable;
