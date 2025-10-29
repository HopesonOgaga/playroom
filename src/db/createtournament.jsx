import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateTournament({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    prize: "",
    date: "",
    logo: "",
    status: "Upcoming",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tournament Created:", formData);
    alert("✅ Tournament Created Successfully!");
    setFormData({
      name: "",
      desc: "",
      prize: "",
      date: "",
      logo: "",
      status: "Upcoming",
    });
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-white overflow-y-auto z-50 animate-slideUp">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">Create Tournament</h2>
        <Link to={"/dashboard"}>
          {" "}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-3xl font-bold transition"
          >
            ×
          </button>
        </Link>
      </header>

      {/* Form Section */}
      <main className="w-full max-w-4xl mx-auto p-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6"
        >
          {/* Tournament Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">
              Tournament Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter tournament name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Prize */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">Prize</label>
            <input
              type="text"
              name="prize"
              placeholder="e.g. 5 ETH or $1000"
              value={formData.prize}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-2 text-gray-700">
              Description
            </label>
            <textarea
              name="desc"
              placeholder="Describe your tournament..."
              value={formData.desc}
              onChange={handleChange}
              rows="4"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Logo */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">
              Logo Image URL
            </label>
            <input
              type="text"
              name="logo"
              placeholder="https://example.com/logo.png"
              value={formData.logo}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-2 text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Tournament
            </button>
          </div>
        </form>
      </main>

      {/* Subtle Slide Animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
