import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateRestaurant() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/restaurant", formData);
      console.log("Response:", res);
      navigate("/admin/res-dash?tab=restaurant");
    } catch (error) {
      console.error(error);
      setError(error.response || error);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-5"
      >
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create Restaurant
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <TextInput
            type="text"
            placeholder="Restaurant owner name"
            required
            name="ownerName"
            style={{ color: "black" }}
            className="flex-1"
            onChange={handleChange}
          />

          <TextInput
            type="text"
            placeholder="Restaurant name"
            required
            style={{ color: "black" }}
            name="restaurantName"
            className="flex-1"
            onChange={handleChange}
          />
        </div>
        <TextInput
          type="text"
          placeholder="Restaurant name"
          required
          style={{ color: "black" }}
          name="restaurantName"
          className="flex-1"
          onChange={handleChange}
        />

        <TextInput
          type="text"
          placeholder="Restaurant location"
          required
          style={{ color: "black" }}
          name="location"
          className="flex-1"
          onChange={handleChange}
        />

        <TextInput
          type="text"
          placeholder="description"
          required
          style={{ color: "black" }}
          name="description"
          className="flex-1"
          onChange={handleChange}
        />

        <div>
          <TextInput
            type="text"
            placeholder="image URL"
            required
            style={{ color: "black" }}
            name="image"
            className="flex-1"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between">
          <div>
            <Link to="/dashboard?tab=res-pkg">
              <Button type="button" color="dark">
                Back
              </Button>
            </Link>
          </div>
          <div>
            <Button type="submit" color="blue">
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
