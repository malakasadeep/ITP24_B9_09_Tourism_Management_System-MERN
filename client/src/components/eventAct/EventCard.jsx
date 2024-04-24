import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdTour } from "react-icons/md";

export const EventCard = ({
  id,
  title,
  description,
  date,
  location,
  image,
  time,
  price,
  type,
}) => {
  const navigate = useNavigate();
  const truncatedDescription = description.substring(0, 30) + "...";
  return (
    <div className="frame">
      <div className="border-collapse- shadow-md hover:shadow-lg transition-colors overflow-hidden rounded-lg w-[330px] h-auto backdrop-blur-md">
        <Link to={`/events/get/${id}`}>
          <img
            src={image}
            className="h-[320px] sm:h-[220px] w-full hover:scale-105 transition-scale duration-300"
          />
          <div>
            <div className="flex flex-col items-center justify-center container ">
              <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-2">
                <div>
                  <div className="flex flex-row items-center gap-1  rounded-lg">
                    <BsFillCalendarDateFill />
                    <div className="text-center">
                      <p className="text-sm font-light text-black">
                        {moment(date).format("MM/DD/YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row items-center gap-1   rounded-lg">
                    <MdOutlineAccessTime />
                    <div className="text-center">
                      <p className="text-sm font-light text-black">{time}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row items-center gap-1   rounded-lg">
                    <MdTour />
                    <div className="text-center">
                      <p className="text-sm font-light text-black">{type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-1">
            <p className="truncate text-xl font-semibold text-black">{title}</p>
          </div>

          <div className="flex justify-center text-center">
            <div className="flex flex-row items-center gap-1 p-1 rounded-lg">
              <div className="text-center">
                <p className="text-base font-light text-black truncate text-justify">
                  {truncatedDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-center">
              <p className="font-semibold text-2xl text-white bg-blue-400 ">
                $ {price}
              </p>

              <p className="text-lg text-center flex items-center justify-center">
                <FaLocationDot className="mr-1" /> {location}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
