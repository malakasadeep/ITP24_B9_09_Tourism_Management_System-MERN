import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePackage() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/package", formData);
      console.log("Response:", res);
      navigate("/admin/res-dash?tab=package");
    } catch (error) {
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
          Create Package
        </h1>

        <TextInput
          type="text"
          placeholder="Package name"
          required
          name="packageName"
          className="flex-1"
          onChange={handleChange}
        />

        <TextInput
          type="number"
          placeholder="Price"
          required
          name="packagePrice"
          className="flex-1"
          onChange={handleChange}
        />

        <TextInput
          type="text"
          placeholder="Package details"
          required
          name="packageDetails"
          className="flex-1"
          onChange={handleChange}
        />
        <div>
          <TextInput
            type="text"
            placeholder="image URL"
            required
            name="image"
            className="flex-1"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <Link to="/dashboard?tab=package">
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
