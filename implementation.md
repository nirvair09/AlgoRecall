# AlgoRecall: Implementation Plan (V1)

## 🧠 The Problem
**"I solve DSA problems → forget patterns → waste time relearning."**

Most developers focus on *quantity* (number of problems solved) rather than *retention* (understanding and recall). Without a system to revisit problems at the optimal time, patterns are forgotten, and interview performance suffers.

## 🔥 Core Strategy: Spaced Repetition for DSA
AlgoRecall is not a bookmark manager; it is a **discipline system**. It forces active recall based on the Forgetting Curve, ensuring that once you solve a problem, you master the pattern for life.

---

## 🚀 Version 1: "The Minimum Viable System"

### 1. Frictionless Problem Ingestion
*   **Input**: URL (LeetCode, Codeforces, etc.).
*   **Auto-Extraction**: Fetch Title, Difficulty, and Platform (via LeetCode GraphQL or simple parsing).
*   **Mandatory Reflection**: Users *must* fill in a "Notes" section before saving.
    *   *Approach explanation*
    *   *Key trick/Insight*
    *   *Common mistakes*

### 2. The Spaced Repetition Engine
V1 will use a fixed-interval schedule to keep it simple and effective:
*   **Intervals**: Day 1 → Day 3 → Day 7 → Day 14 → Day 30.
*   **Logic**:
    *   **Success (Easy/Medium)**: Move to the next interval.
    *   **Failure**: Reset the interval back to Day 1.
*   **Data Model**: Each problem tracks `nextReviewDate` and `currentIntervalIndex`.

### 3. Daily Revision Dashboard
A distraction-free "To-Do" list.
*   **🔴 Due Today**: Problems whose `nextReviewDate` is today or earlier.
*   **⚠️ Overdue**: Problems missed in previous days (high priority).
*   **➕ Add New**: Quick entry for today's solved problems.

### 4. Active Recall Flow
Don't just show the code. Force the brain to work.
1.  **Stage 1: The Prompt** (Show Title + Tags only).
2.  **Stage 2: The Assessment** (User asks: "Can I solve this right now?").
3.  **Stage 3: The Result** (User selects: ✅ Easy | 😐 Medium | ❌ Fail).
4.  **Stage 4: Review** (Show user's own notes and original problem link).
5.  **Stage 5: Scheduling** (System updates the next review date).

### 5. Topic & Pattern Tracking
Categorize problems to identify weak areas.
*   **Tags**: DP, Graph, Sliding Window, Trees, Binary Search, etc.
*   **Analytics**: Total solved vs. Mastered (reached Day 30).

---

## ⚙️ Tech Stack
*   **Frontend**: React + Tailwind CSS + Zustand (State Management).
*   **Backend**: Node.js + Express.
*   **Database**: MongoDB (Flexible schema for problem metadata).
*   **Authentication**: JWT-based (Simple email/password).

---

## ⚠️ V1 Non-Goals (DO NOT BUILD)
*   ❌ AI suggestions or complex adaptive algorithms.
*   ❌ Integrated code editor (use LeetCode/VS Code).
*   ❌ Push notifications (In-app dashboard is enough).
*   ❌ Social features or community leaderboards.

---

## 🛠️ Next Steps
1.  **Define Database Schema**: Design the `Problem` and `User` models.
2.  **API Design**: Define endpoints for `addProblem`, `getDueProblems`, and `updateRecallStatus`.
3.  **UI Mockup**: Design the Dashboard and Recall Flow.
