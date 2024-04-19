import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./../assets/css/user/profileCard.scss";
import { FaLinkedin, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  signOutUserstart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function ProfileView() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserstart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };
  return (
    <div className="profile-card-body mt-9">
      <div className="wrapper">
        <div className="profile-card js-profile-card">
          <Link
            to={`${
              currentUser.isadmin
                ? "/admin/dashbard"
                : currentUser.usertype === "Travel Service Providers"
                ? "/additems"
                : "/"
            }`}
          >
            <button className="bg-blue-600 rounded-xl text-white ml-1 mt-1 text-4xl">
              <IoMdArrowRoundBack />
            </button>
          </Link>

          <div className="profile-card__img">
            <img src={currentUser.avatar} alt="profile card" />
          </div>
          <div className="text-center">
            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">
                {currentUser.firstname} {currentUser.lastname}
              </div>

              <div className="profile-card__txt">
                <div className="text-center flex items-center justify-center">
                  <div className="mr-2">
                    <FaUser />
                  </div>
                  <div>{currentUser.username}</div>
                </div>
                <strong>
                  <div className="text-center flex items-center justify-center">
                    <div className="mr-2">
                      <MdEmail />
                    </div>
                    <div>{currentUser.email}</div>
                  </div>
                </strong>
              </div>
              <div className="profile-card-loc">
                <span className="profile-card-loc__icon">
                  <svg className="icon">
                    <use xlinkHref="#icon-location"></use>
                    <div>{currentUser.country}</div>
                  </svg>
                </span>

                <span className="profile-card-loc__txt">
                  <div className="text-center flex items-center justify-center">
                    <div className="mr-2">
                      <FaLocationDot />
                    </div>
                    <div>
                      {currentUser.isadmin ? (
                        <p className="text-green-700 font-semibold">
                          Admin Member
                        </p>
                      ) : (
                        <div>
                          {currentUser.usertype} from{" "}
                          <strong>{currentUser.country}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <div className="profile-card-inf">
              <div className="profile-card-inf__item">
                <div className="profile-card-inf__title">
                  {moment(currentUser.createdAt).format("MM/DD/YYYY h:mm A")}
                </div>
                <div className="profile-card-inf__txt">Created At</div>
              </div>

              <div className="profile-card-inf__item">
                <div className="profile-card-inf__title">
                  {moment(currentUser.updatedAt).format("MM/DD/YYYY h:mm A")}
                </div>
                <div className="profile-card-inf__txt">Updated At</div>
              </div>
            </div>

            <div className="profile-card-social">
              <a
                href="https://www.facebook.com/iaMuhammedErdem"
                className="profile-card-social__item facebook"
                target="_blank"
              >
                <span className="icon-font">
                  <svg className="icon">
                    <FaFacebook />
                  </svg>
                </span>
              </a>

              <a
                href="https://www.facebook.com/iaMuhammedErdem"
                className="profile-card-social__item twitter"
                target="_blank"
              >
                <span className="icon-font">
                  <svg className="icon">
                    <FaTwitter />
                  </svg>
                </span>
              </a>

              <a
                href="https://www.facebook.com/iaMuhammedErdem"
                className="profile-card-social__item instagram"
                target="_blank"
              >
                <span className="icon-font">
                  <svg className="icon">
                    <FaInstagram />
                  </svg>
                </span>
              </a>
              <a
                href="https://www.facebook.com/iaMuhammedErdem"
                className="profile-card-social__item facebook"
                target="_blank"
              >
                <span className="icon-font">
                  <svg className="icon">
                    <FaLinkedin />
                  </svg>
                </span>
              </a>
            </div>

            <div className="profile-card-ctr">
              <div>
                <Link
                  to={`${
                    currentUser.isadmin
                      ? "/admin/profile-update"
                      : currentUser.usertype === "Travel Service Providers"
                      ? "/seller/profile-update"
                      : "/profile-update"
                  }`}
                >
                  <button className="profile-card__button button--blue js-message-btn">
                    Update
                  </button>
                </Link>
              </div>

              <button
                className="profile-card__button button--orange"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
