const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  updateFeedbackStatus,
  getAllFeedbacks,
} = require("../controllers/feedbackController");

router.post("/feedback", submitFeedback);
router.get("/feedback", getAllFeedbacks); // ← NEW

router.patch("/feedback/:id/status", updateFeedbackStatus); //Upate Resolve or Pending

module.exports = router;
