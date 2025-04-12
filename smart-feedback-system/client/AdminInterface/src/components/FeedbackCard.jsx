import { useState } from "react";

function FeedbackCard({ fb, onStatusChange }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [hrEscalated, setHrEscalated] = useState(false); // ✅ New

  // Define styles based on sentimentScore
  let borderColor = "border-gray-700";
  let sentimentLabel = "Neutral";
  let sentimentColor = "text-yellow-300";

  if (fb.sentimentScore >= 0.4) {
    borderColor = "border-green-500";
    sentimentLabel = "Positive";
    sentimentColor = "text-green-400";
  } else if (fb.sentimentScore <= -0.4) {
    borderColor = "border-red-500";
    sentimentLabel = "Urgent";
    sentimentColor = "text-red-400";
  }

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    if (onStatusChange) {
      await onStatusChange(fb._id);
    }
  };

  return (
    <div
      className={`bg-gray-800 text-white p-6 rounded-2xl shadow-md border-2 ${borderColor}`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xl font-semibold text-yellow-400">
          {fb.rating} ⭐ – {fb.category}
        </p>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            {new Date(fb.createdAt).toLocaleString()}
          </p>

          {fb.status === "pending" && (
            <button
              onClick={handleClick}
              className="mt-1 text-sm text-blue-400 hover:underline"
            >
              Mark as Resolved
            </button>
          )}
          {fb.status === "resolved" && (
            <p className="mt-1 text-green-400 text-sm font-medium">
              ✔ Resolved
            </p>
          )}
        </div>
      </div>

      <p className="mb-2">
        <strong>Comment:</strong> {fb.comment}
      </p>

      {fb.name && (
        <p>
          <strong>Guest:</strong> {fb.name}
        </p>
      )}

      {fb.block && fb.roomNumber && (
        <p>
          <strong>Room:</strong> Block {fb.block}, Room {fb.roomNumber}
        </p>
      )}

      {fb.sentimentScore !== null && (
        <p className={`mt-3 font-bold ${sentimentColor}`}>
          Sentiment: {sentimentLabel} ({fb.sentimentScore.toFixed(2)})
        </p>
      )}

      {/* ✅ Escalation Button for Negative Feedback */}
      {fb.sentimentScore <= -0.4 && !hrEscalated && (
        <button
          onClick={() => setHrEscalated(true)}
          className="mt-3 bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700"
        >
          Send to HR
        </button>
      )}

      {/* ✅ Message after clicking */}
      {hrEscalated && (
        <p className="mt-3 text-green-400 text-sm font-medium">
          Complaint sent to HR ✅
        </p>
      )}

      {/* Confirm box */}
      {showConfirm && (
        <div className="mt-4 bg-gray-700 p-4 rounded-md">
          <p>Are you sure you want to mark this as resolved?</p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleConfirm}
              className="bg-green-500 px-3 py-1 rounded text-sm"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-red-500 px-3 py-1 rounded text-sm"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackCard;
