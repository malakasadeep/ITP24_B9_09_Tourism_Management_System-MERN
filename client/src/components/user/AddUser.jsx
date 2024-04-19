import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddUser() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire("Please enter a valid email address", "", "error");
      return;
    }

    if (formData.password.length <= 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "password must at least have 8 charaters",
      });
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Not Matched!",
      });
      return;
    }

    try {
      setLoading(true);
      if (formData.usertype === "Admin") {
        formData.isadmin = true;
      } else {
        formData.isadmin = false;
      }
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${data.message}`,
        });
        return;
      }

      setLoading(false);
      setError(null);
      Swal.fire({
        title: "Succedd!",
        text: "Your Added!",
        icon: "success",
      });

      navigation("/admin/user");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div>
      <div
        className="p-3 mt-20  bg-white/10 z-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl "
        style={{ width: "600px", backgroundColor: "#dde6ed" }}
      >
        <h1 className="text-3xl text-center font-semibold my-7">
          Add New User
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            id="usertype"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            required
          >
            <option selected hidden disabled>
              Select user type
            </option>
            <option value="Tourist">Tourist</option>
            <option value="Travel Service Providers">
              Travel Service Providers
            </option>
            <option value="Admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Email"
            id="email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Re-type Password"
            id="repeatPassword"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Add User"}
          </button>
          <Link to={"/admin/user"}>
            <p className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 text-center">
              Back
            </p>
          </Link>
        </form>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
