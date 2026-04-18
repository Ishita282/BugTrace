const express = require("express");
const router = express.Router();

const {
  createBug,
  getAllBugs,
  getBugById,
  getSteps,
  addStep,
  updateStep,
  deleteStep,
  getBugByShareToken
} = require("../controllers/bugController");

const validateBug = require("../middleware/validateBug");
const authMiddleware = require("../middleware/authMiddleware");

//===============================
// PUBLIC ROUTES (Access via share token)
//===============================
router.get("/share/:token", getBugByShareToken);

// ==============================
// BUG ROUTES
// ==============================

// Create bug
router.post("/", authMiddleware, validateBug, createBug);

// Get all bugs
router.get("/", authMiddleware, getAllBugs);

// Get single bug
router.get("/:id", authMiddleware, getBugById);

// ==============================
// STEP ROUTES
// ==============================

// Get steps
router.get("/:id/steps", authMiddleware, getSteps);

// Add step
router.post("/:id/steps", authMiddleware, addStep);

// Update step
router.put("/:bugId/steps/:stepId", authMiddleware, updateStep);

// Delete step
router.delete("/:bugId/steps/:stepId", authMiddleware, deleteStep);

module.exports = router;