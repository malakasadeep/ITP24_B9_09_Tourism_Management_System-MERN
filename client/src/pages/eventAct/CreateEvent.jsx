import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [type, setType] = useState("Event");
  const [name, setName] = useState();
  const [date, setDtae] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();
  const [MaxParticipants, setMaxParticipants] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/events/", {
        type,
        name,
        date,
        time,
        location,
        price,
        MaxParticipants,
        description,
      })
      .then((result) => {
        console.log(result);
        navigate("/events/admin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" mt-36">
      <h1 className="text-3xl font-semibold text-center my-7 mt-24">
        Create a New Event or Activity
      </h1>
      <div className="flex items-center justify-center mt-2 container mx-auto">
        <form class="w-full max-w-lg" onSubmit={Submit}>
          <div class="grid grid-cols-2 gap-y-4 gap-x-2">
            <div class="w-full mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Type
              </label>
              <div className="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Event</option>
                  <option>Activity</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-span-2 w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Date
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="date"
                onChange={(e) => setDtae(e.target.value)}
              />
            </div>
            <div className="w-full mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Time
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="12.00 AM"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="w-full mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Location
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Price
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="w-full ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Max participants (0 = unlimited)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="number"
                onChange={(e) => setMaxParticipants(e.target.value)}
              />
            </div>

            <div className="w-full col-span-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Description
              </label>
              <textarea
                type="text"
                className="border p-3 rounded-lg resize appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 my-4">
            <div className="flex items-center justify-center mt-4 container mx-auto">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={Submit}
              >
                Add Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
