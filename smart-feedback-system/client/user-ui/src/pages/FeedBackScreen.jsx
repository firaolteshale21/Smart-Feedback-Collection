import React, { useState } from "react";
import { TfiFaceSad } from "react-icons/tfi";
import { CiFaceMeh, CiFaceSmile } from "react-icons/ci";
import { FaRegFaceGrinBeam, FaRegFaceFrownOpen } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { MdMeetingRoom } from "react-icons/md";
import { GoLocation } from "react-icons/go";

const FeedBackScreen = () => {
  const [name, setName] = useState("");
  const [block, setBlock] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [rating, setRating] = useState(null);
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
 const [location, setLocation] = useState('');
  const faces = [
    { icon: <TfiFaceSad />, value: 1 },
    { icon: <FaRegFaceFrownOpen />, value: 2 },
    { icon: <CiFaceMeh />, value: 3 },
    { icon: <CiFaceSmile />, value: 4 },
    { icon: <FaRegFaceGrinBeam />, value: 5 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !category || !comment) {
      alert("Please complete all required fields.");
      return;
    }

    const payload = {
      name,
      block,
      roomNumber,
      rating,
      category,
      comment,
      imageUrl: "",
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setBlock("");
        setRoomNumber("");
        setRating(null);
        setCategory("");
        setComment("");
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <h1 className="text-2xl font-semibold">
          ✅ Thank you for your feedback!
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6 text-white"
      >
        <h2 className="text-2xl font-bold text-center text-purple-400">
          📝 Guest Feedback Form
        </h2>

        <input
          className="w-full p-2 rounded border border-gray-600 bg-gray-900 placeholder-gray-400"
          placeholder="Your Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-2">
          <input
            className="w-1/2 p-2 rounded border border-gray-600 bg-gray-900 placeholder-gray-400"
            placeholder="Block (Optional)"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
          />
          <input
            className="w-1/2 p-2 rounded border border-gray-600 bg-gray-900 placeholder-gray-400"
            placeholder="Room Number (Optional)"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>
        {/* Location Dropdown */}
        {/* Location Dropdown */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Location (Optional)
          </label>
          <div className="flex items-center border border-gray-600 rounded px-2 bg-gray-900">
            <GoLocation className="text-gray-400 mr-2" />
            <select
              className="w-full py-2 outline-none bg-transparent text-white"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="Lobby">Bishofu</option>
              <option value="Restaurant">Addis Ababa</option>
              <option value="Pool Area">Hawasa Area</option>
              <option value="Spa">Gondar</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            How would you rate the service?
          </label>
          <div className="flex justify-between text-3xl">
            {faces.map((face) => (
              <button
                key={face.value}
                type="button"
                className={`transition-transform ${
                  rating === face.value
                    ? "scale-125 text-purple-400"
                    : "hover:scale-110"
                }`}
                onClick={() => setRating(face.value)}
              >
                {face.icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Category <span className="text-red-400">*</span>
          </label>
          <select
            className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Feedback Category</option>
            <option value="Room Service">Room Service</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Reception">Reception</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Amenities">Amenities</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Comment <span className="text-red-400">*</span>
          </label>
          <textarea
            className="w-full p-2 rounded border border-gray-600 bg-gray-900 placeholder-gray-400"
            placeholder="Tell us more..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
        {/* Floating Chatbot Button */}
        <div className="fixed bottom-5 right-5 z-50">
          {showChatbot ? (
            <div className="w-80 h-96 bg-white border shadow-lg rounded-lg flex flex-col">
              <div className="bg-purple-500 text-white p-3 flex justify-between items-center rounded-t-lg">
                <span>Chatbot</span>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="text-white font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="flex-1 p-3 overflow-y-auto text-sm">
                <p className="mb-2">
                  <strong>Bot:</strong> Hi there! How can I help you?
                </p>
                {/* Add dynamic messages here */}
              </div>
              <div className="p-2 border-t flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-2 py-1 border rounded-l"
                />
                <button className="bg-purple-500 text-white px-3 rounded-r">
                  Send
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowChatbot(true)}
              className="bg-purple-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700"
            >
              💬
            </button>
          )}
        </div>
      </form>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-5 right-5 z-50">
        {showChatbot ? (
          <div className="w-80 h-96 bg-white border shadow-lg rounded-lg flex flex-col">
            <div className="bg-purple-500 text-white p-3 flex justify-between items-center rounded-t-lg">
              <span>Chatbot</span>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white font-bold"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto text-sm">
              <p className="mb-2">
                <strong>Bot:</strong> Hi there! How can I help you?
              </p>
              {/* Add dynamic messages here */}
            </div>
            <div className="p-2 border-t flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-2 py-1 border rounded-l"
              />
              <button className="bg-purple-500 text-white px-3 rounded-r">
                Send
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowChatbot(true)}
            className="bg-purple-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700"
          >
            💬
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedBackScreen;
