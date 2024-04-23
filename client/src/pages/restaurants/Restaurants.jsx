import { useState, useEffect } from "react";
import { TextInput } from "flowbite-react";
import RestaurantCard from "../../components/restaurants/RestaurantCard";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import Header from "../../components/restaurants/Header";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRestaurants = async (query) => {
      try {
        const { data } = await axios.get(
          `/api/restaurant?restaurantName=${query}`
        );
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants(searchQuery);
  }, [searchQuery]);

  return (
    <div>
    
    <div className="mt-32 ml-10 mb-48">
    
      <div className="w-96 mx-auto mb-10">
      <Header/>
        <form>
          <TextInput
            type="text"
            placeholder="Search By Restaurant Name..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))
        ) : (
          <div className="col-span-2 text-center">
            No matching restaurants found.
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
