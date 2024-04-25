import React from "react";
import carMainImg from "../../assets/img/VehicleImg/carmain.png";
import evImg from "../../assets/img/VehicleImg/ev.png";

const VehicleHero = () => {
  return (
    <div className="bg-[#bbd9f6] h-full flex items-center justify-between w-full flex-col lg:flex-row">
      <div className="p-8 pt-18 md:p-24 md:pt-36 lg:p-24 mt-8">
        <h1 className="text-3xl md:text-5xl uppercase font-extrabold text-[#272727]">
          Fast and easy way to
        </h1>
        <h1 className="text-3xl md:text-5xl uppercase font-extrabold text-[#3e48ff] py-4">
          Rent a car
        </h1>
        <p className="text-sm md:text-1xl  lg:max-w-[580px] md:max-w-[900px] text-justify">
          A vehicle renting website is an online platform that allows customers
          to search for, reserve, and rent vehicles such as cars, trucks, vans,
          and occasionally motorcycles or RVs. Users can browse through a
          variety of available vehicles, filter by criteria like location, date,
          vehicle type, and price range, and read customer reviews and ratings
          to help them make informed choices. Once a selection is made,
          customers can book their chosen vehicle by providing personal and
          payment information. The website should offer secure payment methods
          and additional services such as insurance options and add-ons. Account
          management, responsive design, and accessible customer support are
          essential for a smooth and convenient user experience. Clear policies
          regarding rental terms, cancellations, and modifications help
          establish trust and transparency with customers
        </p>

        <div className="flex py-4 items-center justify-center lg:justify-start">
          <img src={evImg} className="w-14 h-14" alt="evlogo" />
          <h2 className="py-4 font-bold text-auto md:text-2xl px-4 ">
            Try EV and Save Atmosphere
          </h2>
        </div>
      </div>

      <div>
        <img
          src={carMainImg}
          className="lg:w-[600px] md:w-[650px] "
          alt="mainCarImage"
        />
      </div>
    </div>
  );
};

export default VehicleHero;
