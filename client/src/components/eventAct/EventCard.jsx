import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

export const EventCard = ({
  id,
  title,
  description,
  date,
  location,
  image,
  price,
}) => {
  const navigate = useNavigate();
  const truncatedDescription = description.substring(0, 100) + "...";
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md mb-4 flex items-center">
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={`Image for ${title}`}
          className="rounded-full"
          width={"200px"}
          height={"200px"}
        />
      </div>
      <div className="ml-4">
        <h2
          onClick={() => {
            navigate(`/events/get/${id}`);
          }}
          className="text-lg font-bold mb-2 text-gray-800 hover:text-blue-500 cursor-pointer"
        >
          {title}
        </h2>
        <p className="text-gray-700 mb-2">{truncatedDescription}</p>
        <p className="text-gray-700">
          {moment(date).format("MM/DD/YYYY")} at {location}
        </p>
        <p className="text-gray-900 font-semibold">
         Ticket Price: $ {price}
        </p>
      </div>
    </div>
  );
};
