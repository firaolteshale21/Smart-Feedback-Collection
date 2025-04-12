const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    block: {
      type: String,
      required: false,
      trim: true,
    },
    roomNumber: {
      type: String,
      required: false,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Room Service",
        "Food & Beverage",
        "Reception",
        "Cleanliness",
        "Amenities",
        "Other",
      ],
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
      default: "",
    },
    sentimentScore: {
      type: Number,
      default: null, // Gemini sentiment will be added later
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending", // This will be shown only to admins
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
