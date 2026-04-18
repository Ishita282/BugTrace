const Bug = require("../models/bugModel");

// ==============================
// HELPER: Get owner (user or guest)
// ==============================
const getOwner = (req) => {
  if (!req.user || !req.user.userId) {
    return null;
  }

  return req.isGuest ? { guestId: req.user.userId } : { user: req.user.userId };
};

// ==============================
// CREATE BUG
// ==============================
exports.createBug = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: "Bug title is required" });
    }

    if (!description?.trim()) {
      return res.status(400).json({ message: "Bug description is required" });
    }

    const bugData = {
      title,
      description,
      ...(req.isGuest
        ? { guestId: req.user.userId }
        : { user: req.user.userId }),
    };

    const bug = await Bug.create(bugData);

    res.status(201).json(bug);
  } catch (err) {
    console.error("CREATE BUG ERROR:", err);
    res.status(500).json({ message: err.message }); // 👈 SHOW ERROR
  }
};

// ==============================
// GET ALL BUGS
// ==============================
exports.getAllBugs = async (req, res, next) => {
  try {
    const owner = getOwner(req);

    if (!owner) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bugs = await Bug.find(owner || {}).sort({ createdAt: -1 });

    res.json(bugs);
  } catch (err) {
    console.error("GET BUGS ERROR:", err);
    res.status(500).json({ message: err.message }); // 👈 TEMP DEBUG
  }
};

// ==============================
// GET BUG BY ID
// ==============================
exports.getBugById = async (req, res, next) => {
  try {
    const owner = getOwner(req);

    const bug = await Bug.findOne({
      _id: req.params.id,
      ...owner,
    });

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    res.json(bug);
  } catch (err) {
    next(err);
  }
};

// ==============================
// GET STEPS
// ==============================
exports.getSteps = async (req, res, next) => {
  try {
    const owner = getOwner(req);

    const bug = await Bug.findOne({
      _id: req.params.id,
      ...owner,
    });

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    const steps = [...bug.steps].sort((a, b) => a.order - b.order);

    res.json(steps);
  } catch (err) {
    next(err);
  }
};

// ==============================
// ADD STEP
// ==============================
exports.addStep = async (req, res, next) => {
  try {
    const owner = getOwner(req);

    const bug = await Bug.findOne({
      _id: req.params.id,
      ...owner,
    });

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    bug.steps.push({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      state: req.body.state,
      order: bug.steps.length + 1,
    });

    await bug.save();

    res.json(bug.steps);
  } catch (err) {
    next(err);
  }
};

// ==============================
// UPDATE STEP
// ==============================
exports.updateStep = async (req, res, next) => {
  try {
    const owner = getOwner(req);

    const bug = await Bug.findOne({
      _id: req.params.bugId,
      ...owner,
    });

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    const step = bug.steps.id(req.params.stepId);

    if (!step) {
      return res.status(404).json({ message: "Step not found" });
    }

    step.title = req.body.title ?? step.title;
    step.description = req.body.description ?? step.description;
    step.type = req.body.type ?? step.type;
    step.state = req.body.state ?? step.state;

    await bug.save();

    res.json(step);
  } catch (err) {
    next(err);
  }
};

// ==============================
// DELETE STEP
// ==============================
exports.deleteStep = async (req, res, next) => {
  try {
    const owner = getOwner(req);

    const bug = await Bug.findOne({
      _id: req.params.bugId,
      ...owner,
    });

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    bug.steps = bug.steps.filter(
      (step) => step._id.toString() !== req.params.stepId,
    );

    await bug.save();

    res.json(bug.steps);
  } catch (err) {
    next(err);
  }
};

// ==============================
// DELETE BUG
// ==============================
exports.deleteBug = async (req, res, next) => {
  try {
    const owner = getOwner(req);

    const bug = await Bug.findOneAndDelete({
      _id: req.params.id,
      ...owner,
    });

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    res.json({ message: "Bug deleted" });
  } catch (err) {
    next(err);
  }
};

// ==============================
// GET bug by share token (NO AUTH REQUIRED)
// ==============================
exports.getBugByShareToken = async (req, res, next) => {
  console.log("shared route is hit");
  try {
    const bug = await Bug.findOne({ shareToken: req.params.token });

    console.log("PARAM TOKEN:", req.params.token);
    console.log("SAMPLE BUG:", await Bug.findOne());

    if (!bug) {
      return res.status(404).json({ message: "Invalid share link" });
    }

    res.json(bug);
  } catch (err) {
    next(err);
  }
};
