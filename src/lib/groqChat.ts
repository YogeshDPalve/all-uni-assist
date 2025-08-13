import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY not found in .env file");
}

// Initialize Groq client
const client = new OpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Study abroad keywords
const studyKeywords: string[] = [
  "study",
  "abroad",
  "university",
  "college",
  "ielts",
  "toefl",
  "application",
  "admission",
  "visa",
  "foreign education",
  "overseas",
  "international student",
  "sop",
  "lor",
  "scholarship",
  "program",
  "bachelor",
  "master",
  "phd",
  "degree",
  "country",
  "tuition",
  "ranking",
  "semester",
  "intake",
  "language test",
  "gre",
  "gpa",
  "credits",
];

// Fuzzy matching function
function isStudyAbroadRelated(userInput: string): boolean {
  const words = userInput.toLowerCase().split(/\s+/);
  return words.some((word) =>
    studyKeywords.some((keyword) => similarity(word, keyword) >= 0.75)
  );
}

// Simple string similarity (Levenshtein ratio-like)
function similarity(s1: string, s2: string): number {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  return (longerLength - editDistance(longer, shorter)) / longerLength;
}

function editDistance(s1: string, s2: string): number {
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// Chat history
const history: { role: "system" | "user" | "assistant"; content: string }[] = [
  {
    role: "system",
    content:
      "You are a helpful assistant that ONLY answers questions related to studying abroad. " +
      "If the user's question is unrelated, respond with: " +
      "'❌ I only provide information related to study abroad topics.'",
  },
];

// Main function
export async function askGroqWithHistory(userInput: string) {
  if (!isStudyAbroadRelated(userInput)) {
    return {
      result: "❌ I only provide information related to study abroad topics.",
      source_documents: [],
    };
  }

  // Add user message
  history.push({ role: "user", content: userInput });

  try {
    const response = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: history,
    });

    const message = response.choices[0]?.message?.content?.trim() || "";

    // Add assistant reply to history
    history.push({ role: "assistant", content: message });

    return {
      result: message,
      source_documents: ["Groq Chat API"],
    };
  } catch (error: any) {
    return {
      result: `❌ Error: ${error.message}`,
      source_documents: [],
    };
  }
}
