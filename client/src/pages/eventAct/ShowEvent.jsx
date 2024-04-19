import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import pkgbanner from "../../assets/img/bg/pkg-banner.jpg";
import loadingimg from "../../assets/img/loading.gif";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdEventNote } from "react-icons/md";

const ShowEvent = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/events/${params.id}`);
        const data = await response.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setEvent(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPackage();
  }, [params.id]);

  return (
    <div>
      <div
        style={{
          background: `url(${pkgbanner})center no-repeat`,
          backgroundSize: "cover",
          height: "400px",
        }}
      ></div>
      <main>
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <img src={loadingimg} alt="loading" className="w-28" />
            <p className="text-center my-7 text-2xl">Loading...</p>
          </div>
        )}
        {error && (
          <p className="text-center my-7 text-2xl">Something went wrong!!</p>
        )}
        {event && !loading && !error && (
          <div className="">
            <div className="w-[900px] h-auto ml-32 -mt-56 bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl ">
              <div>
                <br />
                <img
                  src={event.imageUrls[0]}
                  className="m-5 rounded-lg w-[420px]  object-contain mt-5"
                />
                <img
                  src={event.imageUrls[1]}
                  className="m-5 rounded-lg w-[420px] object-contain mt-5 absolute top-6 right-0"
                />
                <img
                  src={event.imageUrls[2]}
                  className="m-5 rounded-lg w-[620px] object-contain mt-5 mx-auto"
                />
              </div>
              <div>
                <h1 className="mt-16 text-center font-semibold text-3xl text-blue-950">
                  {event.title}
                </h1>
              </div>
              <hr className="w-3/4 h-2 mx-auto my-4 bg-gray-100 border-0 rounded md:my-4 dark:bg-blue-950" />

              <div className="flex items-center justify-center mt-2 container mx-auto">
                <div className="grid grid-cols-2 gap-x-36 gap-y-8">
                  <div>
                    {event.type === "Event" ? (
                      <div className="flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg">
                        <img
                          src="{}"
                          alt=""
                          className="w-12 h-auto object-contain"
                        />
                        <div className="text-center">
                          <p className="text-xl font-serif text-slate-900">
                            Event
                          </p>
                        </div>
                      </div>
                    ) : event.type === "Activity" ? (
                      <div className="flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg">
                        <img
                          src=""
                          alt=""
                          className="w-12 h-auto object-contain"
                        />
                        <div className="text-center">
                          <p className="text-xl font-serif text-slate-900">
                            Activity
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    {event.location ? (
                      <div className="flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg">
                        <FaLocationDot className="text-4xl" />
                        <div className="text-center">
                          <div className="text-center">
                            <p className="text-xl font-serif text-slate-900">
                              Loaction
                            </p>
                            <p className="text-sm font-serif text-slate-700">
                              {event.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    {event.date && (
                      <div className="flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg">
                        <BsCalendarDateFill className="text-4xl" />
                        <div className="text-center">
                          <p className="text-xl font-serif text-slate-900">
                            Date
                          </p>
                          <p className="text-sm font-serif text-slate-700">
                            {event.date.toString().split("T")[0]}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {event.time && (
                      <div className="flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg">
                        <MdOutlineAccessTimeFilled className="text-4xl" />
                        <div className="text-center">
                          <p className="text-xl font-serif text-slate-900">
                            Time
                          </p>
                          <p className="text-sm font-serif text-slate-700">
                            {event.time}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {event.description && (
                  <div>
                    <div className="flex flex-row h-auto gap-4 mt-9 ml-9 mr-9 justify-center items-center">
                      <img
                        src=""
                        alt=""
                        className="w-12 h-auto object-contain"
                      />
                      <p className="text-xl font-serif text-slate-900 ">
                        Description:{" "}
                      </p>
                    </div>
                    <p className="text-sm font-serif text-slate-700 m-7 mt-0">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{event.description}
                    </p>
                  </div>
                )}
              </div>
              <hr className="w-3/4 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-blue-950" />
            </div>
            {/*<div className="absolute top-0 right-0 mt-[550px] mr-[30px] w-[400px] h-auto  bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl">
              <div>
                {!packagee.offer ? (
                  <div>
                    <div className="flex flex-wrap justify-between gap-10 items-center m-4">
                      <div>
                        <p className="font-extralight text-4xl text-blue-700">
                          {packagee.days} Days
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-5xl text-slate-800">
                          $ {packagee.price}
                        </p>
                        {packagee.type === "reguler" ? (
                          <p>Per Person</p>
                        ) : packagee.type === "couple" ? (
                          <p>Per two Person</p>
                        ) : packagee.type === "family" ? (
                          <p>Per two Person</p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <span>
                        &#9733; Offers :{" "}
                        <span className=" font-serif text-slate-600">
                          No any Offers
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className=" grid grid-cols-2 justify-between gap-x-3 gap-y-3 items-center m-4">
                      <div>
                        <p className="font-serif text-4xl text-blue-700">
                          {packagee.days} Days
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold font-serif text-5xl text-slate-800">
                          $ {packagee.price}
                        </p>
                        {packagee.type === "reguler" ? (
                          <p>Per Person</p>
                        ) : packagee.type === "couple" ? (
                          <p>Per two Person</p>
                        ) : packagee.type === "family" ? (
                          <p>Per two Person</p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="mt-7">
                        <p className="font-extralight font-serif text-base text-slate-600">
                          Reguler Price
                        </p>
                      </div>
                      <div className="text-center mt-7">
                        <p className="font-thin font-serif text-2xl text-slate-800">
                          $ {packagee.price}
                        </p>
                      </div>
                      <div>
                        <p className="font-extralight font-serif text-base text-slate-600">
                          Offer
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-thin font-serif text-2xl text-red-800">
                          $ {packagee.price - packagee.offerprice}
                        </p>
                      </div>
                      <hr className="w-full h-2  bg-gray-100 border-0 rounded  dark:bg-blue-950" />
                      <hr className="w-full h-2  bg-gray-100 border-0 rounded  dark:bg-blue-950" />
                      <div>
                        <p className="font-extralight font-serif text-base text-slate-600">
                          Final Price
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold font-serif text-5xl text-slate-700">
                          $ {packagee.offerprice}
                        </p>
                        {packagee.type === "reguler" ? (
                          <p>Per Person</p>
                        ) : packagee.type === "couple" ? (
                          <p>Per two Person</p>
                        ) : packagee.type === "family" ? (
                          <p>Per two Person</p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <span>
                        &#9733;{" "}
                        <span className="font-serif text-red-600">
                          This offer valid for limited tme.
                        </span>
                        &#9733;
                      </span>
                    </div>
                    <div>
                      {currentUser && currentUser.usertype === "Tourist" && (
                        <div>
                          <Booking />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>*/}

            <div className="absolute top-[1000px] right-[30px] w-[400px]">
              {currentUser &&
                currentUser.usertype === "Tourist" &&
                !contact && (
                  <div>
                    <button
                      className="bg-sky-800 text-white font-serif rounded-lg uppercase hover:opacity-95 p-3 w-[400px]"
                      onClick={() => setContact(true)}
                    >
                      Contact for more details.
                    </button>
                  </div>
                )}
              {/*contact && <Contact packagee={packagee} />*/}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShowEvent;
