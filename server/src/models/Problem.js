const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
            },
        ],
        currentIntervalIndex: {
            type: Number,
            default: 0, // 0: Day 1, 1: Day 3, 2: Day 7, 3: Day 14, 4: Day 30
        },
        nextReviewDate: {
            type: Date,
            default: function () {
                const date = new Date();
                date.setDate(date.getDate() + 1); // Default to tomorrow
                return date;
            },
        },
        isMastered: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
