const axios = require("axios");
const cheerio = require("cheerio");

const fetchMetadata = async (url) => {
    try {
        const platform = getPlatform(url);
        let metadata = {
            title: "",
            difficulty: "Medium",
            platform: platform,
            tags: [],
        };

        if (platform === "LeetCode") {
            metadata = await fetchLeetCodeMetadata(url);
        } else {
            // Generic scraper for others
            const { data } = await axios.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                },
            });
            const $ = cheerio.load(data);

            metadata.title = $("title").text().split("-")[0].trim() || "Unknown Problem";
            // Heuristic for difficulty if present in text
            const bodyText = $("body").text();
            if (bodyText.includes("Easy")) metadata.difficulty = "Easy";
            else if (bodyText.includes("Hard")) metadata.difficulty = "Hard";
        }

        return metadata;
    } catch (error) {
        console.error("Scraping error:", error);
        return null;
    }
};

const getPlatform = (url) => {
    if (url.includes("leetcode.com")) return "LeetCode";
    if (url.includes("codeforces.com")) return "Codeforces";
    if (url.includes("geeksforgeeks.org")) return "GeeksForGeeks";
    return "Other";
};

const fetchLeetCodeMetadata = async (url) => {
    // Extract slug from URL
    const match = url.match(/problems\/([^/]+)/);
    if (!match) return { title: "LeetCode Problem", platform: "LeetCode" };
    const slug = match[1];

    const query = `
    query getQuestionDetail($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        title
        difficulty
        topicTags {
          name
        }
      }
    }
  `;

    try {
        const response = await axios.post("https://leetcode.com/graphql", {
            query,
            variables: { titleSlug: slug },
        });

        const q = response.data.data.question;
        return {
            title: q.title,
            difficulty: q.difficulty,
            platform: "LeetCode",
            tags: q.topicTags.map((t) => t.name),
        };
    } catch (error) {
        return { title: slug.replace(/-/g, " "), platform: "LeetCode" };
    }
};

module.exports = { fetchMetadata };
