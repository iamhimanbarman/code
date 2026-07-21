import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { request } from "https";

const prisma = new PrismaClient();

function downloadCsv(targetUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    function get(reqUrl: string) {
      const req = request(reqUrl, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location);
          return;
        }
        
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        
        res.on("end", () => {
          resolve(body);
        });
      });
      
      req.on("error", (e) => {
        reject(e);
      });
      
      req.end();
    }
    
    get(targetUrl);
  });
}

function parseCsv(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
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
      if (char === "\r" && csvText[i + 1] === "\n") {
        i++;
      }
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

function parseTags(tagsStr: string): string[] {
  try {
    const clean = tagsStr.replace(/[\[\]']/g, "").trim();
    if (!clean) return [];
    return clean.split(",").map((s) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function getStarterCode(titleSlug: string, title: string): string {
  const funcName = titleSlug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return JSON.stringify({
    javascript: `/**\n * @param {any} input\n * @return {any}\n */\nvar ${funcName} = function(input) {\n    // Your code here\n};`,
    python: `class Solution:\n    def ${funcName}(self, input: any) -> any:\n        # Your code here\n        pass`,
    cpp: `class Solution {\npublic:\n    int ${funcName}(int input) {\n        // Your code here\n        return 0;\n    }\n};`,
    java: `class Solution {\n    public int ${funcName}(int input) {\n        // Your code here\n        return 0;\n    }\n}`
  });
}

function getExamples(title: string, slug: string): string {
  return JSON.stringify([
    {
      input: "/* Run sample case or custom test cases */",
      output: "/* Expect output from solution */",
      explanation: `Interactive playground for ${title}. Submit your solution to test correctness.`,
    },
  ]);
}

function getTestCases(): string {
  return JSON.stringify([
    { input: [], expected: null },
  ]);
}

async function main() {
  console.log("🌱 Seeding database with full LeetCode dataset...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@codeverse.dev" },
    update: {},
    create: {
      email: "admin@codeverse.dev",
      username: "admin",
      displayName: "CodeVerse Admin",
      passwordHash: adminPassword,
      role: "ADMIN",
      isVerified: true,
      xp: 50000,
      level: 50,
      streak: 365,
    },
  });

  // Create sample instructor
  const instructorPassword = await bcrypt.hash("instructor123", 12);
  const instructor = await prisma.user.upsert({
    where: { email: "instructor@codeverse.dev" },
    update: {},
    create: {
      email: "instructor@codeverse.dev",
      username: "mentor_pro",
      displayName: "Sarah Chen",
      passwordHash: instructorPassword,
      role: "INSTRUCTOR",
      isVerified: true,
      bio: "Senior Software Engineer & Educator",
      xp: 35000,
      level: 35,
      streak: 120,
    },
  });

  // Create sample student
  const studentPassword = await bcrypt.hash("student123456", 12);
  const student = await prisma.user.upsert({
    where: { email: "student@codeverse.dev" },
    update: {},
    create: {
      email: "student@codeverse.dev",
      username: "code_ninja",
      displayName: "Alex Rivera",
      passwordHash: studentPassword,
      role: "STUDENT",
      bio: "Aspiring full-stack developer",
      xp: 2500,
      level: 3,
      streak: 14,
    },
  });

  // Create courses
  const courses = [
    {
      title: "JavaScript Mastery: From Zero to Hero",
      slug: "javascript-mastery",
      description:
        "A comprehensive course covering JavaScript fundamentals, ES6+, async programming, and modern best practices.",
      level: "BEGINNER" as const,
      category: "Web Development",
      tags: ["javascript", "es6", "web"],
      authorId: instructor.id,
      duration: 1200,
      lessonsCount: 45,
      enrolledCount: 3420,
      rating: 4.8,
      isPublished: true,
      isFree: true,
    },
    {
      title: "Data Structures & Algorithms in Python",
      slug: "dsa-python",
      description:
        "Master data structures and algorithms with Python. From arrays to graphs, with 200+ practice problems.",
      level: "INTERMEDIATE" as const,
      category: "Computer Science",
      tags: ["python", "dsa", "algorithms"],
      authorId: instructor.id,
      duration: 2400,
      lessonsCount: 80,
      enrolledCount: 5100,
      rating: 4.9,
      isPublished: true,
      isFree: false,
      price: 19.99,
    },
    {
      title: "Full-Stack Development with Next.js",
      slug: "fullstack-nextjs",
      description:
        "Build production-ready full-stack applications with Next.js, TypeScript, Prisma, and PostgreSQL.",
      level: "ADVANCED" as const,
      category: "Web Development",
      tags: ["nextjs", "typescript", "fullstack"],
      authorId: instructor.id,
      duration: 1800,
      lessonsCount: 60,
      enrolledCount: 2200,
      rating: 4.7,
      isPublished: true,
      isFree: false,
      price: 29.99,
    },
  ];

  for (const course of courses) {
    const { tags, ...rest } = course;
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: {
        ...rest,
        tags: JSON.stringify(tags),
      },
    });
  }

  // Fetch full dataset of LeetCode challenges
  let rows: string[][] = [];
  try {
    const datasetUrl = "https://huggingface.co/datasets/Alishohadaee/leetcode-problems-dataset/resolve/main/raw_data/leetcode_problems.csv";
    console.log("   Downloading LeetCode CSV dataset...");
    const csvData = await downloadCsv(datasetUrl);
    console.log("   Parsing CSV lines...");
    rows = parseCsv(csvData);
    console.log(`   Parsed ${rows.length} rows including headers.`);
  } catch (err) {
    console.warn("⚠️ Failed to download LeetCode dataset from HuggingFace. Seeding with mock challenges instead.");
  }
  
  // Clean old submissions and challenges to avoid constraints conflicts
  console.log("   Clearing existing submissions and challenges...");
  await prisma.submission.deleteMany({});
  await prisma.challenge.deleteMany({});

  const challengeDataList = [];
  const seenSlugs = new Set<string>();

  if (rows.length > 0) {
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 8) continue;

      const rawDifficulty = row[0] || "Easy";
      const title = row[3];
      const titleSlug = row[4];
      const descriptionHtml = row[7];
      const categoryStr = row[14] || "Algorithms";
      const acceptanceRateStr = row[15] || "75.0";
      const topicsStr = row[16] || "[]";

      if (!title || !titleSlug) continue;

      const normalizedSlug = titleSlug.trim().toLowerCase();
      if (seenSlugs.has(normalizedSlug)) continue;
      seenSlugs.add(normalizedSlug);

      // Difficulty mapping
      let difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT" = "EASY";
      if (rawDifficulty.toLowerCase() === "medium") {
        difficulty = "MEDIUM";
      } else if (rawDifficulty.toLowerCase() === "hard") {
        difficulty = "HARD";
      }

      const description = descriptionHtml ? descriptionHtml.trim() : `<p>Description for challenge <strong>${title}</strong> is locked or not provided.</p>`;
      const tags = parseTags(topicsStr);
      const acceptanceRate = parseFloat(acceptanceRateStr) || 75.0;

      let xpReward = 50;
      if (difficulty === "MEDIUM") xpReward = 100;
      if (difficulty === "HARD") xpReward = 150;

      const starterCode = getStarterCode(normalizedSlug, title);
      const examples = getExamples(title, normalizedSlug);
      const testCases = getTestCases();

      challengeDataList.push({
        title: title.trim(),
        slug: normalizedSlug,
        description,
        difficulty,
        category: categoryStr.trim(),
        tags: JSON.stringify(tags),
        constraints: "None specified.",
        inputFormat: "Standard LeetCode input format.",
        outputFormat: "Standard LeetCode output format.",
        examples,
        starterCode,
        testCases,
        solutionCount: Math.floor(Math.random() * 2000) + 100,
        acceptanceRate,
        xpReward,
        isPublished: true,
      });
    }
  } else {
    // Seed standard local challenges fallback
    const localChallenges = [
      { id: "concatenation-of-array", slug: "concatenation-of-array", title: "Concatenation of Array", difficulty: "EASY" as const, category: "Arrays", tags: ["arrays", "easy"], xpReward: 50 },
      { id: "two-sum", slug: "two-sum", title: "Two Sum", difficulty: "EASY" as const, category: "Arrays", tags: ["arrays", "hash-table"], xpReward: 50 },
      { id: "valid-parentheses", slug: "valid-parentheses", title: "Valid Parentheses", difficulty: "EASY" as const, category: "Stacks", tags: ["stacks", "strings"], xpReward: 50 },
      { id: "merge-two-sorted-lists", slug: "merge-two-sorted-lists", title: "Merge Two Sorted Lists", difficulty: "EASY" as const, category: "Linked Lists", tags: ["linked-lists"], xpReward: 50 },
      { id: "longest-substring-no-repeat", slug: "longest-substring-no-repeat", title: "Longest Substring Without Repeating Characters", difficulty: "MEDIUM" as const, category: "Sliding Window", tags: ["strings", "hash-table"], xpReward: 100 },
      { id: "reverse-linked-list", slug: "reverse-linked-list", title: "Reverse Linked List", difficulty: "EASY" as const, category: "Linked Lists", tags: ["linked-lists"], xpReward: 50 }
    ];

    for (const c of localChallenges) {
      challengeDataList.push({
        title: c.title,
        slug: c.slug,
        description: `<p>Simulated practice description for <strong>${c.title}</strong>.</p>`,
        difficulty: c.difficulty,
        category: c.category,
        tags: JSON.stringify(c.tags),
        constraints: "None specified.",
        inputFormat: "Standard input.",
        outputFormat: "Standard output.",
        examples: getExamples(c.title, c.slug),
        starterCode: getStarterCode(c.slug, c.title),
        testCases: getTestCases(),
        solutionCount: Math.floor(Math.random() * 500) + 50,
        acceptanceRate: 65.0,
        xpReward: c.xpReward,
        isPublished: true,
      });
    }
  }

  console.log(`   Prepared ${challengeDataList.length} challenges for seeding.`);

  // Seeding challenges in batches of 1000 to prevent postgres parameters binding overflow limit (65535)
  const batchSize = 1000;
  for (let i = 0; i < challengeDataList.length; i += batchSize) {
    const batch = challengeDataList.slice(i, i + batchSize);
    await prisma.challenge.createMany({ data: batch });
    console.log(`   Seeded batch of ${batch.length} challenges (${i + batch.length}/${challengeDataList.length})...`);
  }

  // Create skills for student
  const skills = [
    { name: "JavaScript", category: "LANGUAGE" as const, level: 3, xp: 2800, maxXp: 3000 },
    { name: "Python", category: "LANGUAGE" as const, level: 2, xp: 1500, maxXp: 2000 },
    { name: "React", category: "FRAMEWORK" as const, level: 2, xp: 1200, maxXp: 2000 },
    { name: "Arrays", category: "DSA" as const, level: 2, xp: 1800, maxXp: 2000 },
    { name: "PostgreSQL", category: "DATABASE" as const, level: 1, xp: 600, maxXp: 1000 },
  ];

  for (const skill of skills) {
    await prisma.userSkill.upsert({
      where: { userId_name: { userId: student.id, name: skill.name } },
      update: {},
      create: { userId: student.id, ...skill },
    });
  }

  console.log("✅ Database seeded successfully!");
  console.log(`   Admin:      admin@codeverse.dev / admin123456`);
  console.log(`   Instructor: instructor@codeverse.dev / instructor123`);
  console.log(`   Student:    student@codeverse.dev / student123456`);
  console.log(`   Courses:    ${courses.length} created`);
  console.log(`   Challenges: ${challengeDataList.length} created`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
