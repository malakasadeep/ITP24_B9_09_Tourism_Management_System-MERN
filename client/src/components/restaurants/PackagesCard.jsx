import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

export default function PackagesCard({ packageData }) {
  return (
    <Card
      className="w-72 mx-auto"
      imgSrc={packageData.image}
      horizontal={false}
    >
      <h5
        className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        style={{ color: "black" }}
      >
        {packageData.packageName}
      </h5>
      <p>
        <b>Price: </b> ${packageData.packagePrice}
      </p>

      <p className="font-normal text-gray-700 dark:text-gray-400">
        {packageData.packageDetails}
      </p>

      <div className="flex">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStar />
      </div>

      <Link to={`/res-pkg-book/${packageData._id}`}>
        <Button color="dark" className="bg-red-700">
          Book Now
        </Button>
      </Link>
    </Card>
  );
}
