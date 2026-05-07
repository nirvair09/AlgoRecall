const Problem = require("../models/Problem");

const INTERVALS = [1, 3, 7, 14, 30];

// @desc    Add a new problem
// @route   POST /api/problems
// @access  Private
const addProblem = async (req, res) => {
    const { title, url, difficulty, platform, notes, tags } = req.body;

    const problem = await Problem.create({
        user: req.user._id,
        title,
        url,
        difficulty,
        platform,
        notes,
        tags,
    });

    if (problem) {
        res.status(201).json(problem);
    } else {
        res.status(400).json({ message: "Invalid problem data" });
    }
};

// @desc    Get all problems for user
// @route   GET /api/problems
// @access  Private
const getProblems = async (req, res) => {
    const problems = await Problem.find({ user: req.user._id });
    res.json(problems);
};

// @desc    Get problems due for review
// @route   GET /api/problems/due
// @access  Private
const getDueProblems = async (req, res) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today

    const problems = await Problem.find({
        user: req.user._id,
        nextReviewDate: { $lte: today },
        isMastered: false,
    }).sort({ nextReviewDate: 1 });

    res.json(problems);
};

// @desc    Update recall status
// @route   PUT /api/problems/:id/recall
// @access  Private
const updateRecallStatus = async (req, res) => {
    const { status } = req.body; // "Easy", "Medium", "Fail"
    const problem = await Problem.findById(req.params.id);

    if (problem) {
        if (problem.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        if (status === "Fail") {
            problem.currentIntervalIndex = 0;
        } else {
            // Easy or Medium
            if (problem.currentIntervalIndex < INTERVALS.length - 1) {
                problem.currentIntervalIndex += 1;
            } else {
                problem.isMastered = true;
            }
        }

        const daysToAdd = INTERVALS[problem.currentIntervalIndex];
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + daysToAdd);
        problem.nextReviewDate = nextDate;

        const updatedProblem = await problem.save();
        res.json(updatedProblem);
    } else {
        res.status(404).json({ message: "Problem not found" });
    }
};

// @desc    Get stats
// @route   GET /api/problems/stats
// @access  Private
const getStats = async (req, res) => {
    const total = await Problem.countDocuments({ user: req.user._id });
    const mastered = await Problem.countDocuments({ user: req.user._id, isMastered: true });
    const dueToday = await Problem.countDocuments({
        user: req.user._id,
        nextReviewDate: { $lte: new Date() },
        isMastered: false,
    });

    res.json({
        total,
        mastered,
        dueToday,
    });
};

module.exports = {
    addProblem,
    getProblems,
    getDueProblems,
    updateRecallStatus,
    getStats,
};
