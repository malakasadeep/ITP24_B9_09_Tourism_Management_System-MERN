import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get(`/api/restaurant?restaurantId=${id}`);
        setFormData(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackages();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/api/restaurant/${id}`, formData);
      toast.success("Updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Update failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error(error);
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
            className="flex-1"
            value={formData.ownerName || ""}
            onChange={handleChange}
          />

          <TextInput
            type="text"
            placeholder="Restaurant name"
            required
            name="restaurantName"
            className="flex-1"
            value={formData.restaurantName || ""}
            onChange={handleChange}
          />
        </div>
        <TextInput
          type="text"
          placeholder="Restaurant location"
          required
          name="location"
          className="flex-1"
          value={formData.location || ""}
          onChange={handleChange}
        />

        <TextInput
          type="text"
          placeholder="description"
          required
          name="description"
          className="flex-1"
          value={formData.description || ""}
          onChange={handleChange}
        />

        <div>
          <TextInput
            type="text"
            placeholder="image URL"
            name="image"
            className="flex-1"
            onChange={handleChange}
          />
          <img src={formData.image} alt="" className="w-96 mt-3" />
        </div>

        <div className="flex justify-between">
          <div>
            <Link to="/dashboard?tab=restaurant">
              <Button type="button" color="dark">
                Back
              </Button>
            </Link>
          </div>
          <div>
            <Button type="submit" color="blue">
              Update
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
