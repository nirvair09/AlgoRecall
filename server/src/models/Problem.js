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
        easeFactor: {
            type: Number,
            default: 2.5,
        },
        intervalDays: {
            type: Number,
            default: 0, // 0 means it's new/due today
        },
        repetitions: {
            type: Number,
            default: 0,
        },
        nextReviewDate: {
            type: Date,
            default: Date.now,
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
