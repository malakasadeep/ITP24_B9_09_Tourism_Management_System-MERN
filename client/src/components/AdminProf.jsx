import React from "react";
import { AdminProfHeader } from "./AdminProfHeader";
import "../assets/css/adminprofile.css";
import { useSelector } from "react-redux";
import { MdPersonAddAlt1 } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  signOutUserstart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export const AdminProf = () => {
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
    <div className="profile">
      <AdminProfHeader />

      <div className="user--profile">
        <div className="user--detail">
          <img src={currentUser.avatar} alt="" />
          <h3 className="username text-2xl font-semibold text-slate-500">
            {currentUser.firstname ? (
              <h3>{currentUser.firstname}</h3>
            ) : (
              <h3>{currentUser.username}</h3>
            )}
          </h3>
          <span className="">Admin</span>
        </div>

        <div className="user--action">
          <Link to={"/admin/user/add"}>
            <div className="actions-00">
              <div className="action--details">
                <div className="action--cover">
                  <MdPersonAddAlt1 />
                </div>
                <div className="action--name">
                  <div className="action--title">Add User</div>
                </div>
              </div>
            </div>
          </Link>

          <Link to={"/admin/profile"}>
            <div className="actions-00">
              <div className="action--details">
                <div className="action--cover">
                  <ImProfile />
                </div>
                <div className="action--name">
                  <div className="action--title">My Profile</div>
                </div>
              </div>
            </div>
          </Link>

          <div className="actions-00" onClick={handleSignOut}>
            <div className="action--details">
              <div className="action--cover">
                <FaSignOutAlt />
              </div>
              <div className="action--name">
                <div className="action--title">Sign Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
