import React from "react";
import hotel from "../assets/img/icons/hotel.png";
import restaurant from "../assets/img/icons/restaurant.png";
import vehicle from "../assets/img/icons/vehicle.png";
import event from "../assets/img/icons/event.png";
import tour_agent from "../assets/img/icons/tour-agent.png";
import tour_pkg from "../assets/img/icons/tour_pkg.png";
import profile from "../assets/img/icons/profile.png";
import train from "../assets/img/icons/train.png";
import { Link } from "react-router-dom";

const functions = [
  {
    name: "User Profile Management",
    icon: profile,
    link: "/admin/user",
  },
  {
    name: "Tour Package Management",
    icon: tour_pkg,
    link: "/admin/packages",
  },
  {
    name: "Hotel and Room Management",
    icon: hotel,
  },
  {
    name: "Vehicle Management",
    icon: vehicle,
  },
  {
    name: "Restourent Management",
    icon: restaurant,
  },
  {
    name: "Tour Guid Management",
    icon: tour_agent,
  },
  {
    name: "Event and Activity Management",
    icon: event,
    link: "/events/admin",
  },
  {
    name: "Train Reservation Management",
    icon: train,
  },
];
export const AdminCard = () => {
  return (
    <div className="card--container">
      {functions.map((func, index) => (
        <div className="card" key={index}>
          <Link to={func.link}>
            <div className="card--cover">
              <img src={func.icon}></img>
            </div>
            <div className="card--title">
              <h2>{func.name}</h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
