# AlgoRecall 🧠

**Live Demo:** [https://algo-recall-beta.vercel.app/](https://algo-recall-beta.vercel.app/)

AlgoRecall is a discipline-focused system for mastering Data Structures and Algorithms (DSA) using the **SM-2 Spaced Repetition Algorithm**. It ensures you never forget a pattern once you've solved it.

## 🚀 Version 2 Features

- **Adaptive Recall (SM-2)**: Dynamically adjusts review intervals based on your recall quality.
- **AI-Powered Auto-Ingestion**: Input a LeetCode URL, and the system fetches the title, difficulty, and tags automatically.
- **Visual Mastery & Analytics**: 
    - Activity Heatmap (GitHub-style)
    - Pattern Radar (Performance across topics)
    - Difficulty Distribution
- **Rich Content Support**: Write your notes in Markdown with full syntax highlighting for code snippets.
- **Advanced Organization**: Global fuzzy search and difficulty-based filtering.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Zustand, Framer Motion, Recharts.
- **Backend**: Node.js, Express, MongoDB.
- **Services**: Custom scraper with LeetCode GraphQL integration.

## 🏁 Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI

### Setup
1. Clone the repo.
2. `cd server` && `npm install` && `npm start`
3. `cd client` && `npm install` && `npm run dev`

---
*Built for developers who value retention over quantity.*
