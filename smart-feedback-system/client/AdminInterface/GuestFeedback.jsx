import { useState } from "react";

function GuestFeedback() {
  const [formData, setFormData] = useState({
    name: "",
    block: "",
    roomNumber: "",
    rating: 5,
    category: "Room Service",
    comment: "",
    imageUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSubmitted(true);
      setFormData({
        name: "",
        block: "",
        roomNumber: "",
        rating: 5,
        category: "Room Service",
        comment: "",
        imageUrl: "",
      });
    } else {
      alert("Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <h1 className="text-2xl font-semibold">
          ✅ Thank you for your feedback!
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-3xl font-bold text-center">📝 Guest Feedback</h2>

        <input
          name="name"
          type="text"
          placeholder="Your Name (optional)"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={formData.name}
          onChange={handleChange}
        />

        <div className="flex gap-2">
          <input
            name="block"
            type="text"
            placeholder="Block (optional)"
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            value={formData.block}
            onChange={handleChange}
          />
          <input
            name="roomNumber"
            type="text"
            placeholder="Room Number (optional)"
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            value={formData.roomNumber}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm">Rating:</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="bg-gray-700 text-white p-1 rounded"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white p-2 rounded"
          >
            <option>Room Service</option>
            <option>Food & Beverage</option>
            <option>Reception</option>
            <option>Cleanliness</option>
            <option>Amenities</option>
            <option>Other</option>
          </select>
        </div>

        <textarea
          name="comment"
          placeholder="Your Feedback..."
          className="w-full p-2 h-28 rounded bg-gray-700 text-white"
          value={formData.comment}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default GuestFeedback;
