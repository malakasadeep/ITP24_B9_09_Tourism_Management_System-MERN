import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";

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
                  <Link
                          to={`/events/create`}>Add Event
                  </Link>
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
                    <td>Type</td>
                    <td>Name</td>
                    <td>Date</td>
                    <td>Time</td>
                    <td>Location</td>
                    <td>Price</td>
                    <td>Participants</td>
                    <td>Action</td>
                  </tr>
                  {events?.map((event) => (
                    <tr className="text-center" key={event._id}>
                      <td>{event.type}</td>
                      <td>{event.name}</td>
                      <td>{event.date?.toString().split("T")[0]}</td>
                      <td>{event.time}</td>
                      <td>{event.location}</td>
                      <td>{event.price}</td>
                      <td>
                        {event.participants}/{event.MaxParticipants}
                      </td>
                      <td>
                        <Link
                          to={`/events/update/${event._id}`}
                          className="btnU" 
                        >
                          Update
                        </Link>
                        <button
                          className="btnD" 
                          onClick={(e) => handleDelete(event._id)}
                        >
                          Delete
                        </button>
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
    // <div className=" mt-36">
    //   <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
    //     <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    //       <Link to="/events/create" className="btn btn-success">
    //         Add Events
    //       </Link>
    //       <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    //         <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //           <tr>
    //             <th scope="col" class="px-6 py-3">
    //               Type
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //               Name
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //               Date
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //               Time
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //               Location
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //               Price
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //               Participants
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //               Action
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {events?.map((event) => {
    //             return (
    //               <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
    //                 <td>{event.type}</td>
    //                 <td>{event.name}</td>
    //                 <td>{event.date?.toString().split("T")[0]}</td>
    //                 <td>{event.time}</td>
    //                 <td>{event.location}</td>
    //                 <td>{event.price}</td>
    //                 <td>
    //                   {event.participants}/{event.MaxParticipants}
    //                 </td>
    //                 <td>
    //                   <Link
    //                     to={`/events/update/${event._id}`}
    //                     className="btn btn-success"
    //                   >
    //                     Update
    //                   </Link>
    //                   <button
    //                     className="btn btn-danger"
    //                     onClick={(e) => handleDelete(event._id)}
    //                   >
    //                     Delete
    //                   </button>
    //                 </td>
    //               </tr>
    //             );
    //           })}

    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
}

export default EventTable;
