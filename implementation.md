# AlgoRecall: Implementation Plan (V1 & V2)

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

---

## 🌟 Version 2: "The Intelligent Recall System"

### 1. Smart Adaptation (SM-2 Algorithm)
Move from fixed intervals to an adaptive algorithm similar to Anki.
*   **Ease Factor**: Each problem has an "Ease" score (starts at 2.5).
-   **Calculation**:
    -   `Easy`: Increase Ease Factor, set longer interval.
    -   `Medium`: Keep Ease Factor, standard interval.
    -   `Fail`: Decrease Ease Factor, reset interval to Day 0.
*   **Outcome**: Spend more time on hard patterns (e.g., DP) and less on easy ones (e.g., Arrays).

### 2. AI-Powered Auto-Ingestion
Reduce friction during the "Add Problem" phase.
*   **Scraping/API**: Input a LeetCode URL, and the system automatically fetches:
    -   Title & Slug
    -   Difficulty Level
    -   Example Test Cases
    -   Company Tags (if available)
*   **Outcome**: User only needs to write the "Notes" section.

### 3. Visual Mastery & Analytics
Motivate users with data-driven progress tracking.
*   **Heatmap**: A GitHub-style "Activity Heatmap" to track daily review consistency.
*   **Pattern Radar**: A radar chart showing performance across different topics (Trees vs. DP vs. Graphs).
*   **Retention Graph**: Visualize the "Forgetting Curve" and how many problems are nearing "Mastered" status.

### 4. Rich Content Support
Enhance the "Review" stage for better understanding.
*   **Markdown Support**: Use React-Markdown to allow code snippets, bold text, and lists in notes.
*   **Code Highlighting**: Proper syntax highlighting for the "Ideal Solution" section.
*   **Image Uploads**: Attach screenshots of hand-drawn logic or whiteboards.

### 5. Advanced Organizational Tools
Help manage a growing database of hundreds of problems.
*   **Global Search**: Fuzzy search through titles and tags.
*   **Bulk Actions**: Mark multiple problems as mastered or move them to a different category.
*   **Collections**: Group problems into "Blind 75", "Striver SDE Sheet", or "Custom Mock Interviews".

---

## 🚀 Version 3: "The Interview Mastery Suite"

### 1. AI Mock Interview Mode
*   **Feature**: Use Gemini to simulate a real-time technical interview.
*   **Goal**: Move beyond "remembering" to "explaining" and "coding" under pressure.

### 2. Integrated Code Sandbox
*   **Feature**: Monaco Editor integration with a code execution engine.
*   **Goal**: Verify that your recalled pattern actually compiles and runs.

### 3. Browser Extension
*   **Feature**: One-click ingestion from LeetCode/Codeforces.
*   **Goal**: Zero friction for adding new problems.

### 4. Collaborative Sheets & Social
*   **Feature**: Shareable collections and review streaks leaderboards.
*   **Goal**: Leverage community and peer accountability.

---

## 🛠️ Next Steps (V2 & V3)
1.  **Integrate AI Service**: ✅ Integrated (Gemini 1.5 Flash).
2.  **Refactor Spaced Repetition Engine**: ✅ Integrated (SM-2 Algorithm).
3.  **UI Overhaul**: ✅ Integrated (Analytics, Markdown Support, AI Mode).
4.  **Polish**: Refine Markdown rendering and ensure mobile responsiveness.
5.  **V3 Initiation**: Start architectural design for the Browser Extension.
