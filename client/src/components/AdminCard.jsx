import React from "react";
import {
  BiHome,
  BiBookAlt,
  BiSolidUserAccount,
  BiPackage,
  BiHotel,
  BiCar,
  BiRestaurant,
  BiCalendarEvent,
  BiTrain,
} from "react-icons/bi";
import { Link } from "react-router-dom";

const functions = [
  {
    name: "User Profile Management",
    icon: "👤",
    link: "/admin/user",
  },
  {
    name: "Tour Package Management",
    icon: "📦",
    link: "/admin/packages",
  },
  {
    name: "Hotel Management",
    icon: "🏨",
  },
  {
    name: "Vehicle Management",
    icon: "🚗",
  },
  {
    name: "Restourent Management",
    icon: "🍽️",
  },
  {
    name: "Tour Guid Management",
    icon: "👨‍🏫",
  },
  {
    name: "Event Management",
    icon: "📅",
    link: "/events/admin",
  },
  {
    name: "Train Reservation Management",
    icon: "🚂",
  },
];
export const AdminCard = () => {
  return (
    <div className="card--container">
      {functions.map((func, index) => (
        <div className="card" key={index}>
          <Link to={func.link}>
            <div className="card--cover">{func.icon}</div>
            <div className="card--title">
              <h2>{func.name}</h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
