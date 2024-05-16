import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import banner from "../../assets/img/bg/event-banner.jpg";
import bg from "../../assets/img/bg/eventbg.jpg";
import loadingimg from "../../assets/img/loading.gif";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { MdTour } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../assets/css/eventact/swiper.css";
import SwiperCore from "swiper";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import EventBooking from "../../components/eventAct/EventBooking";

const ShowEvent = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);
  SwiperCore.use([Autoplay]);
  console.log("currentUser", currentUser);

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
      <div className="mt-96"></div>
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
            <div
              className="w-[900px] h-auto ml-32 -mt-56 bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl"
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
              }}
            >
              <Swiper // image
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                autoplay={{ delay: 3000 }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper swiper-container " 
              >
                {event.imageUrls.map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <img src={imageUrl} alt={`Image ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>

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
                        <MdTour className="text-3xl" />
                        <div className="text-center">
                          <p className="text-xl font-serif text-slate-900">
                            Event
                          </p>
                        </div>
                      </div>
                    ) : event.type === "Activity" ? (
                      <div className="flex flex-row items-center gap-4 border border-blue-900 p-5 rounded-lg">
                        <MdTour className="text-3xl" />
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

            <div
              className="absolute top-0 right-0 mt-[250px] mr-[30px] w-[400px] h-auto  bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl"
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
              }}
            >
              <div>
                <div className="flex flex-wrap justify-between gap-10 items-center m-4">
                  <div>
                    <p className="font-extralight text-4xl text-blue-700">
                      Price
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-5xl text-slate-800">
                      $ {event.price}
                    </p>
                  </div>
                </div>
                <div>
                  {currentUser && currentUser.usertype === "Tourist" && (
                    <div>
                      <EventBooking event={event} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShowEvent;
