const express = require("express");
const router = express.Router();
const {
    addProblem,
    getProblems,
    getDueProblems,
    updateRecallStatus,
    getStats,
    fetchMetadata,
    getAnalytics,
} = require("../controllers/problemController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addProblem).get(protect, getProblems);
router.get("/due", protect, getDueProblems);
router.get("/stats", protect, getStats);
router.get("/analytics", protect, getAnalytics);
router.get("/fetch-metadata", protect, fetchMetadata);
router.put("/:id/recall", protect, updateRecallStatus);

module.exports = router;
