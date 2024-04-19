import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import addpkgimg from "../assets/img/addpkgimg.jpg";
import addhotelimg from "../assets/img/addhotelimg.jpg";
import addresturentimg from "../assets/img/addresturentimg.jpg";
import addvehiimg from "../assets/img/addvehiimg.jpg";
import addagentimg from "../assets/img/addagentimg.jpg";
import eventimg from "../assets/img/eventact.jpg";

import "./../assets/css/addItems.scss";

export default function AddItems() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="add-item-containe mt-32 mb-24">
      <div className="main">
        <ul className="cards">
          <li className="cards_item">
            <div className="card123">
              <div className="card_image">
                <img src={addpkgimg} />
              </div>
              <div className="card_content">
                <h2 className="card_title">Tour Packages</h2>
                <p className="card_text">
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                <Link to={"/seller/create-package"}>
                  <button className="btn card_btn">Add Packages</button>
                </Link>
              </div>
            </div>
          </li>
          <li className="cards_item">
            <div className="card123">
              <div className="card_image">
                <img src={addhotelimg} />
              </div>
              <div className="card_content">
                <h2 className="card_title">Hotel and Residence</h2>
                <p className="card_text">
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                <Link to={"/create-hotel"}>
                  <button className="btn card_btn">Add Hotels</button>
                </Link>
              </div>
            </div>
          </li>
          <li className="cards_item">
            <div className="card123">
              <div className="card_image">
                <img src={addresturentimg} />
              </div>
              <div className="card_content">
                <h2 className="card_title">Restourents</h2>
                <p className="card_text">
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                <button className="btn card_btn">Add Restourents</button>
              </div>
            </div>
          </li>
          <li className="cards_item">
            <div className="card123">
              <div className="card_image">
                <img src={addvehiimg} />
              </div>
              <div className="card_content">
                <h2 className="card_title">Vehicles</h2>
                <p className="card_text">
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                <button className="btn card_btn">Add Vehicles</button>
              </div>
            </div>
          </li>
          <li className="cards_item">
            <div className="card123">
              <div className="card_image">
                <img src={eventimg} />
              </div>
              <div className="card_content">
                <h2 className="card_title">Event and Activities</h2>
                <p className="card_text">
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                <Link to={"/events/create"}>
                  <button className="btn card_btn">Add Events</button>
                </Link>
              </div>
            </div>
          </li>
          <li className="cards_item">
            <div className="card123">
              <div className="card_image">
                <img src={addagentimg} />
              </div>
              <div className="card_content">
                <h2 className="card_title">Tour Guides</h2>
                <p className="card_text">
                  Demo of pixel perfect pure CSS simple responsive card grid
                  layout
                </p>
                <button className="btn card_btn">Add Guides</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
