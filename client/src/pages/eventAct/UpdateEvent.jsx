import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateEvent() {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5173/api/events/" + id)
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);

  const dateValue = data?.date;
  const isValidDate = !isNaN(Date.parse(dateValue));

  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/api/events/" + id, {
        ...data,
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
        Update Event or Activity
      </h1>
      <div className="flex items-center justify-center mt-2 container mx-auto">
        <form class="w-full max-w-lg">
          <div class="grid grid-cols-2 gap-y-4 gap-x-2">
            <div class="w-full mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Type
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  value={data?.type}
                  onChange={(e) =>
                    setData((cs) => ({
                      ...cs,
                      type: e.target.value,
                    }))
                  }
                >
                  <option>Event</option>
                  <option>Activity</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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

            <div class="w-full mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                value={data?.name}
                onChange={(e) =>
                  setData((cs) => ({
                    ...cs,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div class="col-span-2 w-full">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Date
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="date"
                value={
                  isValidDate
                    ? new Date(dateValue).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setData((cs) => ({
                    ...cs,
                    date: e.target.value,
                  }))
                }
              />
            </div>
            <div class="w-full mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Time
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="12.00 AM"
                value={data?.time}
                onChange={(e) =>
                  setData((cs) => ({
                    ...cs,
                    time: e.target.value,
                  }))
                }
              />
            </div>

            <div class="w-full mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Location
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                value={data?.location}
                onChange={(e) =>
                  setData((cs) => ({
                    ...cs,
                    location: e.target.value,
                  }))
                }
              />
            </div>

            <div class="w-full">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Price
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                value={data?.price}
                onChange={(e) =>
                  setData((cs) => ({
                    ...cs,
                    price: e.target.value,
                  }))
                }
              />
            </div>

            <div class="w-full ">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Max participants (0 = unlimited)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
              />
            </div>

            <div className="w-full col-span-2">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Description
              </label>
              <textarea
                type="text"
                className="border p-3 rounded-lg resize appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                value={data?.description}
                onChange={(e) =>
                  setData((cs) => ({
                    ...cs,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 my-4">
            <div className="flex items-center justify-center mt-4 container mx-auto">
              <button
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  handleUpdate();
                }}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEvent;
