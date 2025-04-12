import { useEffect, useState } from "react";
import { socket } from "./socket";
import FeedbackCard from "./components/FeedbackCard";
import FeedbackSentimentChart from "./components/FeedbackSentimentChart";
import toast from "react-hot-toast";


function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
      });

    socket.on("newFeedback", (data) => {
      setFeedbacks((prev) => [data, ...prev]);
      // ✅ Alert if feedback is very negative
      if (data.sentimentScore !== null && data.sentimentScore <= -0.7) {
        toast.error("🚨 Urgent feedback received! Please review.");
      }
    });
    

    return () => {
      socket.off("newFeedback");
    };
  }, []);

  const handleStatusChange = async (feedbackId) => {
    const res = await fetch(
      `http://localhost:5000/api/feedback/${feedbackId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "resolved" }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      setFeedbacks((prev) =>
        prev.map((fb) => (fb._id === data.feedback._id ? data.feedback : fb))
      );
    } else {
      console.error("Failed to update status", data);
    }
  };

  // ✅ Apply filter & sort
  let filteredFeedbacks = [...feedbacks];

  if (statusFilter !== "all") {
    filteredFeedbacks = filteredFeedbacks.filter(
      (fb) => fb.status === statusFilter
    );
  }

  filteredFeedbacks.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-10 px-4 text-white">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        🧠 Admin Dashboard – Real-Time Guest Feedback
      </h1>
      <FeedbackSentimentChart feedbacks={feedbacks} />
      {/* Filter & Sort Controls */}
      <div className="flex justify-between items-center max-w-3xl mx-auto mb-6">
        <div>
          <label className="mr-2 text-sm text-gray-300">
            Filter by status:
          </label>
          <select
            className="bg-gray-700 text-white rounded px-2 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div>
          <label className="mr-2 text-sm text-gray-300">Sort by:</label>
          <select
            className="bg-gray-700 text-white rounded px-2 py-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {filteredFeedbacks.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">
            No feedbacks match your filter.
          </p>
        ) : (
          filteredFeedbacks.map((fb) => (
            <FeedbackCard
              key={fb._id}
              fb={fb}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
