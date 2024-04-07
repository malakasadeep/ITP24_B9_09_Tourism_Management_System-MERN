import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../../firebase";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    type: "",
    title: "",
    date: "",
    time: "",
    location: "",
    price: 0,
    MaxParticipants: 0,
    description: "",
  });
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
      setUploading(true);
      setFileUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setFileUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setFileUploadError(
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Image upload failed (2MB max)",
            })
          );
          setUploading(false);
        });
    } else {
      setFileUploadError(
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You can upload max 6 images",
        })
      );
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `eventImages/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleremoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "date" ||
      e.target.type === "time"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    if (e.target.type === "select-one") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*if (
      !formData.type ||
      !formData.title ||
      !formData.date ||
      !formData.time ||
      !formData.location ||
      !formData.price ||
      !formData.MaxParticipants ||
      !formData.description
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `'Please fill out all fields.'`,
      });
      return;
    }*/

    // Additional validation for specific fields
    if (isNaN(formData.price)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Price must be a number.",
      });
      return;
    }

    if (formData.price <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Price must be greater than zero.",
      });
      return;
    }

    if (isNaN(formData.MaxParticipants)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Max Participants must be a number.",
      });
      return;
    }

    if (formData.MaxParticipants < 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Max Participants must be a positive number.",
      });
      return;
    }

    // Validate future date
    const selectedDate = new Date(formData.date);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a future date.",
      });
      return;
    }
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("http://localhost:3000/api/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          //userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${data.message}`,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Package added successfully",
        });
        navigate(`/event/get/${data._id}`);
        //navigate("/events/admin");
      }
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`,
      });
      setLoading(false);
    }
  };

  return (
    <div className=" mt-36">
      <h1 className="text-3xl font-semibold text-center my-7 mt-24">
        Create a New Event or Activity
      </h1>
      <div className="flex items-center justify-center mt-2 container mx-auto">
        <form
          class="w-full max-w-lg"
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 flex-1">
            <div class="grid grid-cols-2 gap-y-4 gap-x-2">
              <div class="w-full mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Type
                </label>
                <div className="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="type"
                    type="text"
                    onChange={handleChange}
                    checked={formData.type}
                  >
                    <option value="Event">Event</option>
                    <option value="Activity">Activity</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="title"
                  type="text"
                  onChange={handleChange}
                  checked={formData.title}
                />
              </div>
              <div className="col-span-2 w-full">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Date
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="date"
                  type="date"
                  onChange={handleChange}
                  checked={formData.date}
                />
              </div>
              <div className="w-full mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-city"
                >
                  Time
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="time"
                  type="time"
                  placeholder="12.00 AM"
                  onChange={handleChange}
                  checked={formData.time}
                />
              </div>

              <div className="w-full mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-zip"
                >
                  Location
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="location"
                  type="text"
                  onChange={handleChange}
                  checked={formData.location}
                />
              </div>

              <div className="w-full">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="price"
                  type="number"
                  onChange={handleChange}
                  checked={formData.price}
                />
              </div>

              <div className="w-full ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Max participants (0 = unlimited)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="MaxParticipants"
                  type="number"
                  onChange={handleChange}
                  checked={formData.MaxParticipants}
                />
              </div>

              <div className="w-full col-span-2">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  className="border p-3 rounded-lg resize appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  onChange={handleChange}
                  checked={formData.description}
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-4">
              <p className="font-semibold">
                Images:
                <span className="font-normal text-gray-600 ml-2">
                  The first image will be the cover (max 3)
                </span>
              </p>
              <div className="flex gap-4">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  type="file"
                  className="p-3 border border-blue-700 rounded w-full"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  onClick={handleImageSubmit}
                  className="p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-xl disabled:opacity-80"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              <p className="text-sm self-center font-semibold">
                {fileUploadError ? (
                  <span className="text-red-700">Error image upload</span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700">
                    Image upload successfully!!
                  </span>
                ) : (
                  ""
                )}
              </p>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between p-3 border border-blue-700 items-center"
                  >
                    <img
                      src={url}
                      alt="pkg images"
                      className="w-24 h-24 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleremoveImage(index)}
                      className="text-red-700 text-5xl font-extrabold rounded-lg uppercase hover:opacity-60"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                ))}
              <div className="flex flex-wrap -mx-3 my-4">
                <div className="flex items-center justify-center mt-4 container mx-auto">
                  <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                    Add Event
                  </button>
                </div>
              </div>
              {error && <p className="text-red-600">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
