/**
 * generate-challenges.js
 * Downloads the LeetCode problems CSV from Hugging Face and produces
 * a compact JSON file suitable for the frontend static data layer.
 *
 * Output: frontend/public/data/challenges.json
 *
 * Usage:  node backend/scripts/generate-challenges.js
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const DATASET_URL =
  "https://huggingface.co/datasets/Alishohadaee/leetcode-problems-dataset/resolve/main/raw_data/leetcode_problems.csv";

// ──────────────── CSV Parser ────────────────
function parseCsv(csvText) {
  const rows = [];
  let currentRow = [];
  let currentVal = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      if (inQuotes && csvText[i + 1] === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      currentRow.push(currentVal);
      currentVal = "";
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && csvText[i + 1] === "\n") i++;
      currentRow.push(currentVal);
      rows.push(currentRow);
      currentRow = [];
      currentVal = "";
    } else {
      currentVal += char;
    }
  }
  if (currentRow.length > 0 || currentVal !== "") {
    currentRow.push(currentVal);
    rows.push(currentRow);
  }
  return rows;
}

// ──────────────── Helpers ────────────────
function parseTags(raw) {
  try {
    const clean = raw.replace(/[\[\]']/g, "").trim();
    if (!clean) return [];
    return clean
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugToFuncName(slug) {
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function buildStarterCode(slug) {
  const fn = slugToFuncName(slug);
  return {
    javascript: `/**\n * @param {any} input\n * @return {any}\n */\nvar ${fn} = function(input) {\n    // Write your solution here\n};`,
    python: `class Solution:\n    def ${fn}(self, input):\n        # Write your solution here\n        pass`,
    cpp: `class Solution {\npublic:\n    // Write your solution here\n};`,
    java: `class Solution {\n    // Write your solution here\n}`,
  };
}

function parseAcceptance(raw) {
  const n = parseFloat(raw);
  return isNaN(n) ? 50 : Math.round(n * 10) / 10;
}

// Assign a category from the first tag, or fall back
const CATEGORY_MAP = {
  Array: "Arrays",
  String: "Strings",
  "Hash Table": "Hash Table",
  "Dynamic Programming": "Dynamic Programming",
  Math: "Math",
  Sorting: "Sorting",
  Greedy: "Greedy",
  "Depth-First Search": "Graph",
  "Breadth-First Search": "Graph",
  "Binary Search": "Binary Search",
  Tree: "Tree",
  "Binary Tree": "Tree",
  Matrix: "Matrix",
  "Two Pointers": "Two Pointers",
  "Bit Manipulation": "Bit Manipulation",
  Stack: "Stack",
  "Linked List": "Linked List",
  Design: "Design",
  Heap: "Heap",
  "Priority Queue": "Heap",
  Backtracking: "Backtracking",
  Graph: "Graph",
  Simulation: "Simulation",
  "Sliding Window": "Sliding Window",
  "Divide and Conquer": "Divide and Conquer",
  "Union Find": "Union Find",
  Trie: "Trie",
  Recursion: "Recursion",
  Database: "Database",
  Shell: "Shell",
  Concurrency: "Concurrency",
};

function deriveCategory(tags) {
  for (const tag of tags) {
    if (CATEGORY_MAP[tag]) return CATEGORY_MAP[tag];
  }
  return tags[0] || "Algorithms";
}

// ──────────────── Download ────────────────
function download(url) {
  return new Promise((resolve, reject) => {
    function get(reqUrl) {
      https
        .get(reqUrl, (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            get(res.headers.location);
            return;
          }
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => resolve(body));
        })
        .on("error", reject);
    }
    get(url);
  });
}

// ──────────────── Main ────────────────
async function main() {
  console.log("⬇  Downloading LeetCode CSV dataset …");
  const csv = await download(DATASET_URL);

  console.log("📄 Parsing CSV …");
  const rows = parseCsv(csv);
  console.log(`   ${rows.length - 1} data rows found.`);

  const challenges = [];
  const seenSlugs = new Set();
  let number = 1;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 8) continue;

    const rawDiff = (row[0] || "Easy").trim();
    const frontendId = row[1] || String(i);
    const paidOnly = row[2] === "True";
    const title = (row[3] || "").trim();
    const titleSlug = (row[4] || "").trim().toLowerCase();
    const descriptionHtml = row[7] || "";
    const categoryRaw = (row[14] || "Algorithms").trim();
    const acceptanceStr = row[15] || "50";
    const topicsStr = row[16] || "[]";

    if (!title || !titleSlug) continue;
    if (seenSlugs.has(titleSlug)) continue;
    seenSlugs.add(titleSlug);

    let difficulty = "EASY";
    if (rawDiff.toLowerCase() === "medium") difficulty = "MEDIUM";
    else if (rawDiff.toLowerCase() === "hard") difficulty = "HARD";

    const tags = parseTags(topicsStr);
    const category = deriveCategory(tags) || categoryRaw;

    const description = stripHtml(descriptionHtml) ||
      `Solve the "${title}" problem. Submit your solution to test correctness.`;

    const acceptanceRate = parseAcceptance(acceptanceStr);
    let xpReward = 50;
    if (difficulty === "MEDIUM") xpReward = 100;
    if (difficulty === "HARD") xpReward = 150;

    challenges.push({
      id: titleSlug,
      number: parseInt(frontendId, 10) || number,
      title,
      slug: titleSlug,
      difficulty,
      category,
      tags,
      acceptanceRate,
      xpReward,
      paidOnly,
      description,
      starterCode: buildStarterCode(titleSlug),
      solutionCount: Math.floor(Math.random() * 3000) + 200,
    });
    number++;
  }

  console.log(`✅ ${challenges.length} challenges prepared.`);

  // Difficulty breakdown
  const easy = challenges.filter((c) => c.difficulty === "EASY").length;
  const medium = challenges.filter((c) => c.difficulty === "MEDIUM").length;
  const hard = challenges.filter((c) => c.difficulty === "HARD").length;
  console.log(`   Easy: ${easy} | Medium: ${medium} | Hard: ${hard}`);

  // Write to frontend/public/data/challenges.json
  const outDir = path.resolve(__dirname, "../../frontend/public/data");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outFile = path.join(outDir, "challenges.json");
  fs.writeFileSync(outFile, JSON.stringify(challenges));
  const sizeMB = (fs.statSync(outFile).size / 1024 / 1024).toFixed(2);
  console.log(`📁 Written ${outFile} (${sizeMB} MB)`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
