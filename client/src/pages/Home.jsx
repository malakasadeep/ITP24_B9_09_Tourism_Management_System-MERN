import React, { useEffect, useState } from "react";
import PackageCard from "../components/tour-packages/PackageCard";
import HotelCard from "../components/hotel/HotelCard";
import { Link } from "react-router-dom";
import "./../assets/css/Home.css";
import guidimg from "./../assets/img/guidBanner.png";
import Bubbles from "../components/Bubbles";
import trainbanner from "../assets/img/TrainImages/train-banner.jpg";
import resbanner from "../assets/img/bg/resbanner.png";
import eventbanner from "../assets/img/event/banner.jpg";
import { EventCard } from "../components/eventAct/EventCard";
import VehicleCard from "../components/VehicleManagement/VehicleCard";

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [hotels, sethotels] = useState([]);
  const [events, setevents] = useState([]);
  const [vehicles, setVehicls] = useState([]);
  useEffect(() => {
    const fetchPkg = async () => {
      try {
        const res = await fetch("/api/Package/getpkgs?limit=3");
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPkg();
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("/api/hotel/gethotels?limit=3");
        const data = await res.json();
        sethotels(data);
        console.log(data);
      } catch (error) {}
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events/search/get?limit=3");
        const data = await res.json();
        setevents(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchVehi = async () => {
      try {
        const res = await fetch("/api/vehicle/find?limit=3");
        const data = await res.json();
        setVehicls(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehi();
  }, []);

  return (
    // <div style={{ height: '100%',  backgroundSize: "cover",backgroundPosition: "center", backgroundRepeat: "no-repeat*/"}}>
    //  <h1 className='text-3xl'>Home</h1>
    <div>
      <div id="parallax-world-of-ugg">
        <section>
          <div class="title"></div>
          <Bubbles />
        </section>

        <section>
          <div className="parallax-one">
            <h2>EXPLORE SRI LANKA</h2>
          </div>
        </section>

        <section>
          <div className="block">
            <p>
              <span className="first-character sc">T</span>he "TourCraft” is the
              one of the leading pioneers of providing innovative technology
              solutions for the tourism industry. With over a decade of
              experience, we have been at the forefront of designing modern
              software applications that assist tour operators, tour agencies.
              Our proposed web-application " TourCraft " allows travelers to
              connect with each other, make their travel journey in a
              pleasurable manner. They can easily collaborate with our staff
              members been declining since the company advertisements have no or
              less exposure to the online digital market tendency. Moreover,
              current social media applications are not specialized for
              travelling purposes. To address this adverse impact, this
              user-centric software application supports travel specific
              functions such as: travel planning, finding users interested in
              same travel destination spots, sharing real travel experiences etc
            </p>
          </div>
        </section>

        <section>
          <div className="parallax-three">
            <h2>ENCHANTED FOREST</h2>
          </div>
        </section>

        <section>
          <div className="block">
            <p>
              <span className="first-character atw">W</span>hen the New York
              fashion community notices your brand, the world soon follows. The
              widespread love for UGG extended to Europe in the mid-2000's along
              with the stylish casual movement and demand for premium casual
              fashion. UGG boots and shoes were now seen walking the streets of
              London, Paris and Amsterdam with regularity. To meet the rising
              demand from new fans, UGG opened flagship stores in the UK and an
              additional location in Moscow. As the love spread farther East,
              concept stores were opened in Beijing, Shanghai and Tokyo. UGG
              Australia is now an international brand that is loved by all. This
              love is a result of a magical combination of the amazing
              functional benefits of sheepskin and the heightened emotional
              feeling you get when you slip them on your feet. In short, you
              just feel better all over when you wear UGG boots, slippers, and
              shoes.
            </p>
            <p className="line-break margin-top-10"></p>
          </div>
        </section>
      </div>
      <div>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {packages && packages.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent Packages
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/package-search"}
                >
                  Show more Packages
                </Link>
              </div>

              <div className="flex flex-wrap gap-16">
                {packages.map((pkg) => (
                  <PackageCard pkg={pkg} key={pkg._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {
        <div>
          <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {hotels && hotels.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold text-slate-600">
                    Recent Hotels
                  </h2>
                  <Link
                    className="text-sm text-blue-800 hover:underline"
                    to={"/hotel-search"}
                  >
                    Show more Hotel
                  </Link>
                </div>

                <div className="flex flex-wrap gap-16">
                  {hotels.map((hotell) => (
                    <HotelCard hotell={hotell} key={hotell._id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      }

      {
        <div>
          <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {events && events.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold text-slate-600">
                    Recent Events and Activities
                  </h2>
                  <Link
                    className="text-sm text-blue-800 hover:underline"
                    to={"/events/search/"}
                  >
                    Show more Events and Activities
                  </Link>
                </div>

                <div className="flex flex-wrap gap-16">
                  {events.map((event) => (
                    <EventCard
                      id={event._id}
                      title={event.title}
                      description={event.description}
                      date={event.date}
                      location={event.location}
                      price={event.price}
                      type={event.type}
                      time={event.time}
                      image={event.imageUrls[0]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      }
      {
        <div>
          <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {vehicles && vehicles.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold text-slate-600">
                    Recent Vehicles
                  </h2>
                  <Link
                    className="text-sm text-blue-800 hover:underline"
                    to={"/VehicleHome"}
                  >
                    Show more Vehicles
                  </Link>
                </div>

                <div className="flex flex-wrap gap-16">
                  {vehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle._id}
                      brand={vehicle.brand}
                      image={vehicle.imageUrls[0]}
                      model={vehicle.model}
                      price={vehicle.price}
                      transmissionType={vehicle.transmissionType}
                      fuelType={vehicle.fuelType}
                      capacity={vehicle.seats}
                      vehicleMainImg={vehicle.vehicleMainImg}
                      id={vehicle._id}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      }

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 mt-3">
        <div className="relative">
          <div
            className="inset-0 bg-cover bg-center rounded-md"
            style={{
              backgroundImage: `url(${resbanner})`,
              width: "100%",
              height: "300px", // Adjust height as needed
            }}
          >
            <div className="absolute top-36 left-2 m-5">
              <Link to={"/restaurants"}>
                <button className="bg-blue-500 text-white px-6 text-3xl py-3 rounded-3xl hover:bg-blue-600 w-96 h-24">
                  Find the Foods
                </button>
              </Link>
            </div>
            <div className="flex flex-col justify-items-stretch">
              <h1 className="text-4xl ml-10 font-semibold text-slate-100 text-left mr-4 mt-4">
                ONLINE RESTAURANT FOOD DELIVERY
              </h1>
              <p className="text-left ml-10 text-xl text-sky-200 mt-2 mr-4">
                Whether you want to order breakfast, lunch, dinner, or a snack,
                <br /> TourCraft makes it easy to discover new and
                <br /> nearby places to eat in sri lanka.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 mt-3">
        <div className="relative">
          <div
            className="inset-0 bg-cover bg-center rounded-md"
            style={{
              backgroundImage: `url(${trainbanner})`,
              width: "100%",
              height: "300px", // Adjust height as needed
            }}
          >
            <div className="absolute top-0 right-0 m-5">
              <Link to={"/train/search"}>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-3xl hover:bg-blue-600 mt-20 w-72 text-3xl h-20">
                  Book your Train
                </button>
              </Link>
            </div>
            <div className="flex flex-col justify-items-stretch">
              <h1 className="text-4xl ml-10 font-semibold text-slate-100 text-right mr-4 uppercase mt-4">
                Welcome to TourCraft Railways
              </h1>
              <p className="text-right text-xl text-sky-200 mt-2 mr-4">
                Online Advance Train Seats Reservation
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 mt-3">
        <div className="relative">
          <div
            className="inset-0 bg-cover bg-center rounded-md"
            style={{
              backgroundImage: `url(${guidimg})`,
              width: "100%",
              height: "300px", // Adjust height as needed
            }}
          >
            <div className="absolute top-36 left-2 m-5">
              <Link to={"/guid/search"}>
                <button className="bg-blue-500 text-white px-6 text-3xl py-3 rounded-3xl hover:bg-blue-600 w-96 h-24">
                  Get Your Guide
                </button>
              </Link>
            </div>
            <div className="flex flex-col justify-items-stretch">
              <h1 className="text-4xl ml-10 font-semibold text-slate-100 text-left mr-4 mt-4 uppercase">
                Sell more Experiences
              </h1>
              <p className="text-left ml-10 text-xl text-slate-700 mt-2 mr-4">
                Make memories on your next trip with <br />
                the perfect local guide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}