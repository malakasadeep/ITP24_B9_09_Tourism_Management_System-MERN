import React, { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateGuide() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    address: "",
    language: "",
    NIC: "",
    images: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  console.log(formData);

  useEffect(() => {
    const fetchGuiding = async () => {
      const guidingId = params.guidingId;
      const res = await fetch(`/api/tour-guide/get/${guidingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchGuiding();
  }, []);

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.images.length < 3) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, images: formData.images.concat(urls) });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 2 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
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
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if (
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "email" ||
      e.target.id === "language"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1)
        return setError("You must upload at least one image");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/tour-guide/update/${params.guidingId}`, {
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
      }
      navigate(`/admin/guid`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Tour Guide
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            required
            onChange={handleChange}
            value={formData.email}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <input
            type="text"
            placeholder="NIC"
            className="border p-3 rounded-lg"
            id="NIC"
            required
            onChange={handleChange}
            value={formData.NIC}
          />

          <select
            className="border p-3 rounded-lg"
            id="language"
            onChange={handleChange}
            value={formData.language}
          >
            <option value="">Language</option>
            <option value="Sinhala">Sinhala</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Arab">Arab</option>
          </select>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Profile Image
            <span className="font-normal text-gray-600 ml-2"></span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              onClick={handleImageSubmit}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
          </div>
          {formData.images.length > 0 &&
            formData.images.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}

          <button className="p-3 mx-auto bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Updating..." : "Update Guide"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
