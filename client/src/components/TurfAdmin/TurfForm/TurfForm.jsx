// src/components/TurfForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function TurfForm({ onTurfAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    photo: "",
    price: "",
    timings: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4500/api/turfs", formData);
      onTurfAdded(); // Refresh turf list
      setFormData({
        name: "",
        location: "",
        photo: "",
        price: "",
        timings: "",
        contact: "",
      });
    } catch (err) {
      console.error("Error adding turf", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-4">
      <input name="name" placeholder="Turf Name" value={formData.name} onChange={handleChange} className="w-full p-2 border" />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border" />
      <input name="photo" placeholder="Photo URL" value={formData.photo} onChange={handleChange} className="w-full p-2 border" />
      <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border" />
      <input name="timings" placeholder="Timings" value={formData.timings} onChange={handleChange} className="w-full p-2 border" />
      <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="w-full p-2 border" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Turf</button>
    </form>
  );
}
