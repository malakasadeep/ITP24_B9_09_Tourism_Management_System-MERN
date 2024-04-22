import React, { useEffect, useState } from "react";
import PackageCard from "../components/tour-packages/PackageCard";
import HotelCard from "../components/hotel/HotelCard";
import { Link } from "react-router-dom";
import "./../assets/css/Home.css";
import guidimg from "./../assets/img/4670.gif"
import Bubbles from "../components/Bubbles";

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [hotels, sethotels] = useState([]);

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotels();
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

              <div className="flex flex-wrap gap-10">
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
      <div>
          <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {hotels && hotels.length > 0 && (
              <div className="">
                <div className="my-3">
                  
                  <Link
                    className="text-sm text-blue-800 hover:underline"
                    to={"/guid/search"}
                  >
                    <img src={guidimg}/>
                  </Link>
                </div>

                
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
