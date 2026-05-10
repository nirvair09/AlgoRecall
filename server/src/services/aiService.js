const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateProblemInsights = async (problemDescription) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        You are an expert competitive programmer and technical interviewer. 
        Analyze the following DSA problem description and provide structured insights for a student's recall system.
        
        Problem Description:
        ${problemDescription}

        Please return the response in JSON format with the following keys:
        - "approach": A concise summary of the most efficient approach (1-2 paragraphs).
        - "keyInsight": The "aha!" moment or the core logic trick that makes the problem solvable.
        - "commonMistakes": A list of common pitfalls or edge cases.
        - "complexity": Time and Space complexity.
        - "tags": Relevant tags (e.g., "DP", "Sliding Window", "Graph").

        Ensure the JSON is valid and only return the JSON object.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Extract JSON if AI includes markdown code blocks
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini AI Error:", error);
        return {
            approach: "AI analysis failed. Please manually summarize your approach.",
            keyInsight: "AI analysis failed.",
            commonMistakes: [],
            complexity: "N/A",
            tags: []
        };
    }
};

module.exports = { generateProblemInsights };
