import { useState, useEffect } from "react";
import axios from "axios";
import PackagesCard from "../../components/restaurants/PackagesCard";
import { AiOutlineSearch } from "react-icons/ai";
import { TextInput } from "flowbite-react";
import Header from "../../components/restaurants/Header";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get(
          `/api/package?packageName=${searchQuery}`
        );
        setPackages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackages();
  }, [searchQuery]);

  return (
    <div className="mt-32 ml-10 mb-48">
      <div className="w-96 mx-auto mb-10">
        <Header/>
        <form>
          <TextInput
            type="text"
            placeholder="Search By Package Name..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <PackagesCard key={pkg._id} packageData={pkg} />
          ))
        ) : (
          <div className="col-span-2 text-center">
            No matching packages found.
          </div>
        )}
      </div>
    </div>
  );
}
