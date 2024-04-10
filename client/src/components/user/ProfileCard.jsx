import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "../../assets/css/user/profileCard.scss";
import loadingimg from "../../assets/img/loading.gif";
import { FaLinkedin, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user/${params.id}`);
        const data = await response.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setUser(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchUser();
    //const createdat = user.createdAt;
    //const updatedat = user.updatedAt;

    //const createdatnew = moment(createdat).fromNow();
    //const updatedatnew = moment(updatedat).fromNow();
  }, [params.id]);

  return (
    <div className="profile-card-body">
      {loading && (
        <div className="flex flex-col items-center justify-center">
          <img src={loadingimg} alt="loading" className="w-28" />
          <p className="text-center my-7 text-2xl">Loading...</p>
        </div>
      )}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!!</p>
      )}
      {user && !loading && !error && (
        <div className="wrapper">
          <div className="profile-card js-profile-card">
            <div className="profile-card__img">
              <img src={user.avatar} alt="profile card" />
            </div>
            <div className="text-center">
              <div className="profile-card__cnt js-profile-cnt">
                <div className="profile-card__name">
                  {user.firstname} {user.lastname}
                </div>

                <div className="profile-card__txt">
                  <div className="text-center flex items-center justify-center">
                    <div className="mr-2">
                      <FaUser />
                    </div>
                    <div>{user.username}</div>
                  </div>
                  <strong>
                    <div className="text-center flex items-center justify-center">
                      <div className="mr-2">
                        <MdEmail />
                      </div>
                      <div>{user.email}</div>
                    </div>
                  </strong>
                </div>
                <div className="profile-card-loc">
                  <span className="profile-card-loc__icon">
                    <svg className="icon">
                      <use xlinkHref="#icon-location"></use>
                      <div>{user.country}</div>
                    </svg>
                  </span>

                  <span className="profile-card-loc__txt">
                    <div className="text-center flex items-center justify-center">
                      <div className="mr-2">
                        <FaLocationDot />
                      </div>
                      <div>
                        {user.usertype} from <strong>{user.country}</strong>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div className="profile-card-inf">
                <div className="profile-card-inf__item">
                  <div className="profile-card-inf__title">
                    {moment(user.createdAt).format("MM/DD/YYYY h:mm A")}
                  </div>
                  <div className="profile-card-inf__txt">Created At</div>
                </div>

                <div className="profile-card-inf__item">
                  <div className="profile-card-inf__title">
                    {moment(user.updatedAt).format("MM/DD/YYYY h:mm A")}
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
                {/* Add other social media links similarly */}
              </div>

              <div className="profile-card-ctr">
                <button className="profile-card__button button--blue js-message-btn">
                  Update
                </button>
                <button className="profile-card__button button--orange">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
