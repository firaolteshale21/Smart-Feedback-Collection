const Feedback = require("../models/Feedback");
const { analyzeSentiment } = require("../services/geminiService"); // ✅ Use the real Gemini helper

const submitFeedback = async (req, res) => {
  try {
    const { name, block, roomNumber, rating, category, comment, imageUrl } =
      req.body;

    // ✅ Analyze sentiment
    const sentimentScore = await analyzeSentiment(comment);
    console.log("🧠 Sentiment Score:", sentimentScore); // Optional debug

    const newFeedback = new Feedback({
      name,
      block,
      roomNumber,
      rating,
      category,
      comment,
      imageUrl,
      sentimentScore, // ✅ Save the score
    });

    const savedFeedback = await newFeedback.save();

    const io = req.app.get("io");
    io.emit("newFeedback", savedFeedback);

    return res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: savedFeedback,
    });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
};


//update the status
// ✅ Update status controller
const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "resolved"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    return res.status(200).json({ message: "Status updated", feedback: updatedFeedback });
  } catch (err) {
    console.error("Error updating status:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  updateFeedbackStatus,
  submitFeedback,
  getAllFeedbacks,
};
