import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("GEMINI_API_KEY");
    if (apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.logger.log("Gemini API client initialized successfully.");
      } catch (err) {
        this.logger.error("Failed to initialize Gemini API client:", err);
      }
    } else {
      this.logger.warn("GEMINI_API_KEY is not defined. AI functionality will fallback to simulated mock results.");
    }
  }

  private isAvailable(): boolean {
    return this.genAI !== null;
  }

  async tutorOptimize(code: string, language: string, mode: "optimize" | "debug" | "explain") {
    if (!this.isAvailable()) {
      return this.getSimulatedOptimization(code, language, mode);
    }

    try {
      const model = this.genAI!.getGenerativeModel({
        model: "gemini-3-flash-preview",
        generationConfig: { responseMimeType: "application/json" },
      });

      const prompt = `You are an elite software architect, compiler engineer, and static analyzer.
Analyze the following code written in language: "${language}" under the analysis mode: "${mode}".

Please produce a constructive response containing refactored/optimized code, line-by-line breakdown, or bug fixes depending on the mode:
- optimize: Focus on time/space complexity, resource leaks, caching, CPU cycles, and structural refactoring.
- debug: Identify logical bugs, vulnerabilities, race conditions, edge case failures, or memory leaks, and fix them.
- explain: Explain the mechanics of the code, how data flows, and how complexity behaves.

Return ONLY a JSON object strictly matching this schema:
{
  "title": "Short title describing the main conclusion (e.g. 'Recursion Tabulation' or 'Vulnerability Addressed')",
  "badge": "Short 1-3 word badge indicating class of impact (e.g., 'Performance Boost', 'Security Patch', 'Logical Fix')",
  "explanation": "Clear, detailed markdown explaining the changes, what was sub-optimal, why the fix works, and structural benefits.",
  "diffBefore": "The original code you analyzed",
  "diffAfter": "The complete, refactored, corrected, or fully documented version of the code",
  "metrics": {
    "metric1_name": "metric1_value (e.g., 'O(2^N) Exponential' or '1820ms')",
    "metric2_name": "metric2_value (e.g., 'O(N) Linear' or '< 1ms')",
    "metric3_name": "metric3_value (e.g., '99.9% faster' or 'No vulnerabilities')"
  }
}

Here is the source code:
\`\`\`${language}
${code}
\`\`\``;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      return JSON.parse(responseText);
    } catch (error) {
      this.logger.error("Gemini tutorOptimize failed, returning simulated response:", error);
      return this.getSimulatedOptimization(code, language, mode);
    }
  }

  async tutorChat(prompt: string, history: Array<{ sender: "user" | "ai"; text: string }>) {
    if (!this.isAvailable()) {
      return this.getSimulatedTutorChat(prompt);
    }

    try {
      const model = this.genAI!.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const chatHistoryPrompt = history
        .map(h => `${h.sender === "user" ? "User" : "AI Assistant"}: ${h.text}`)
        .join("\n");

      const promptContext = `You are CodeVerse's elite AI Pair Programmer. Keep your response helpful, technically precise, and concise. You can write code snippets inside markdown blocks.

Conversation History:
${chatHistoryPrompt}

Current User Message: ${prompt}

Response:`;

      const result = await model.generateContent(promptContext);
      return result.response.text();
    } catch (error) {
      this.logger.error("Gemini tutorChat failed, returning simulated response:", error);
      return this.getSimulatedTutorChat(prompt);
    }
  }

  async interviewChat(company: string, role: string, question: string, history: Array<{ sender: "bot" | "user"; text: string }>, newMessage: string) {
    if (!this.isAvailable()) {
      return "Interesting. Tell me how you would optimize that solution if scale went up 100x? Write any details or code in the editor, and click Submit Interview when ready.";
    }

    try {
      const model = this.genAI!.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const chatHistoryPrompt = history
        .map(h => `${h.sender === "user" ? "Candidate" : "Interviewer (You)"}: ${h.text}`)
        .join("\n");

      const promptContext = `You are conducting a live, high-stakes technical coding and system design mock interview for candidate applying to:
Company: ${company}
Role: ${role}
Original Prompt/Question: ${question}

Act strictly as the interviewer. Ask probing questions, check for edge cases, challenge architectural decisions, but remain professional and encouraging. Do not provide the final solution yourself yet. Keep it to 2-3 sentences, asking a follow-up.

Conversation history:
${chatHistoryPrompt}

Candidate's response: ${newMessage}

Interviewer Response:`;

      const result = await model.generateContent(promptContext);
      return result.response.text();
    } catch (error) {
      this.logger.error("Gemini interviewChat failed:", error);
      return "Interesting. Tell me how you would optimize that solution if scale went up 100x? Write any details or code in the editor, and click Submit Interview when ready.";
    }
  }

  async interviewSubmit(company: string, role: string, question: string, code: string, history: Array<{ sender: "bot" | "user"; text: string }>) {
    if (!this.isAvailable()) {
      return {
        verdict: "Strong Hire",
        score: "9.0/10",
        tech: "4.8/5.0",
        comm: "4.5/5.0",
        design: "4.7/5.0",
        detailed: "Excellent attempt! You successfully handled the core constraints of the problem. Please set GEMINI_API_KEY to see a detailed personalized AI code critique.",
      };
    }

    try {
      const model = this.genAI!.getGenerativeModel({
        model: "gemini-3-flash-preview",
        generationConfig: { responseMimeType: "application/json" },
      });

      const chatHistoryPrompt = history
        .map(h => `${h.sender === "user" ? "Candidate" : "Interviewer"}: ${h.text}`)
        .join("\n");

      const prompt = `You are an elite principal engineer evaluating a candidate's mock technical interview response.
Company targeted: ${company}
Role: ${role}
Question asked: ${question}

Here is the conversation log:
${chatHistoryPrompt}

Here is the final candidate code workspace:
\`\`\`
${code}
\`\`\`

Evaluate the candidate based on:
1. Technical correctness and edge-case protection.
2. System design scalability.
3. Communication and articulation.

Return ONLY a JSON object strictly matching this schema:
{
  "verdict": "One of: 'Strong Hire', 'Hire', 'Leaning Hire', 'No Hire'",
  "score": "Overall score out of 10, e.g. '8.5/10'",
  "tech": "Technical rating out of 5.0, e.g. '4.5/5.0'",
  "design": "System Design rating out of 5.0, e.g. '4.2/5.0'",
  "comm": "Communication rating out of 5.0, e.g. '4.0/5.0'",
  "detailed": "A rich markdown critique detailing strengths, architecture suggestions, memory/complexity flaws, and tips to improve."
}

Ensure the output is valid JSON.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      return JSON.parse(responseText);
    } catch (error) {
      this.logger.error("Gemini interviewSubmit failed:", error);
      return {
        verdict: "Hire",
        score: "8.0/10",
        tech: "4.0/5.0",
        comm: "4.2/5.0",
        design: "4.0/5.0",
        detailed: "An automated summary review: Good job on structural separation, but make sure to account for network partition tolerances and index performance. Connect GEMINI_API_KEY for dynamic grading.",
      };
    }
  }

  async projectGenerate(prompt: string, architecture: string, dbType: string, techStack: string) {
    if (!this.isAvailable()) {
      return this.getSimulatedProject(prompt, architecture, dbType, techStack);
    }

    try {
      const model = this.genAI!.getGenerativeModel({
        model: "gemini-3-flash-preview",
        generationConfig: { responseMimeType: "application/json" },
      });

      const systemPrompt = `You are a Senior Project Generator. Scaffold a complete development codebase workspace for a project.
User Concept: "${prompt}"
Architecture style: "${architecture}"
Database: "${dbType}"
Tech stack: "${techStack}"

You must respond with ONLY a JSON object matching this schema:
{
  "files": {
    "filename1 (e.g. package.json)": "complete text content of the file",
    "filename2 (e.g. main.ts or schema.prisma)": "complete text content of the file",
    "filename3 (e.g. README.md)": "complete markdown documentation"
  },
  "apis": [
    {
      "method": "HTTP Verb e.g. GET or POST",
      "path": "path e.g. /api/v1/resource",
      "desc": "Explanation of endpoint purpose"
    }
  ],
  "tasks": [
    {
      "id": "t1",
      "title": "A short, actionable task name",
      "status": "One of: 'todo', 'progress', 'done'"
    }
  ]
}

Provide at least 3 essential configuration and source code files with detailed code. Return ONLY a valid JSON.`;

      const result = await model.generateContent(systemPrompt);
      const responseText = result.response.text();
      return JSON.parse(responseText);
    } catch (error) {
      this.logger.error("Gemini projectGenerate failed:", error);
      return this.getSimulatedProject(prompt, architecture, dbType, techStack);
    }
  }

  async skillScan(githubUrl: string) {
    if (!this.isAvailable()) {
      return {
        repo: githubUrl,
        points: 250,
        badge: "Repository Explorer",
        skillsImpact: [
          { name: "REST & GraphQL APIs", gain: "+15%" },
          { name: "React & Next.js", gain: "+10%" },
        ],
        issues: `Parsed repository context at "${githubUrl}". Codebase utilizes solid abstractions. Set GEMINI_API_KEY in backend/.env to scan code structures with Gemini.`,
      };
    }

    try {
      const model = this.genAI!.getGenerativeModel({
        model: "gemini-3-flash-preview",
        generationConfig: { responseMimeType: "application/json" },
      });

      const prompt = `Analyze this simulated GitHub repository scan request: "${githubUrl}".
Create a fun developer XP / tech skill breakdown for this type of repo. For instance, if it is a react repository, boost Frontend. If it is nest/postgres, boost Backend.

Return ONLY a JSON object matching this schema:
{
  "repo": "${githubUrl}",
  "points": 100 to 500,
  "badge": "Creative name for the scanned badge (e.g., 'API Generalissimo', 'State Sync Hero')",
  "skillsImpact": [
    { "name": "Skill Name matching one of: 'React & Next.js', 'CSS Architecture (Tailwind/Sass)', 'Web Performance & Core Vitals', 'REST & GraphQL APIs', 'Database Design & Optimization', 'Caching & Message Brokers', 'Docker & Containerization', 'CI/CD Pipeline Automation', 'AWS Cloud Services', 'Array & String Manipulation', 'Trees, Graphs & Traversal', 'Dynamic Programming'", "gain": "+15% or other percent" }
  ],
  "issues": "A summary of observations on the code structure, performance tips, or potential architectural issues found in the repository."
}

Return ONLY valid JSON.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      return JSON.parse(responseText);
    } catch (error) {
      this.logger.error("Gemini skillScan failed:", error);
      return {
        repo: githubUrl,
        points: 250,
        badge: "Fallback Scout",
        skillsImpact: [
          { name: "REST & GraphQL APIs", gain: "+10%" },
        ],
        issues: "Failed to query Gemini. Please verify your GEMINI_API_KEY.",
      };
    }
  }

  // Fallback Mocks
  private getSimulatedOptimization(code: string, language: string, mode: string) {
    return {
      title: "Optimized Refactoring (Simulated)",
      badge: "Local fallback",
      explanation: `Since **GEMINI_API_KEY** is not configured in backend/.env, the system is demonstrating with simulated responses. 
      To connect a real Gemini model, configure:
      \`\`\`env
      GEMINI_API_KEY=your_gemini_api_key
      \`\`\`
      in \`backend/.env\` and restart the server.`,
      diffBefore: code,
      diffAfter: `// Optimized version of your code:\n${code.replace(/let /g, "const ")}`,
      metrics: {
        "Status": "Simulated",
        "Key Needed": "GEMINI_API_KEY",
        "Performance": "Mocked",
      },
    };
  }

  private getSimulatedTutorChat(prompt: string): string {
    return `Hello! I'm operating in simulated fallback mode because **GEMINI_API_KEY** is not set in \`backend/.env\`. 

Please configure a valid Gemini API key to experience smart, real-time responses and code suggestions. For now, here is a mock response to your prompt: "${prompt}".`;
  }

  private getSimulatedProject(prompt: string, architecture: string, dbType: string, techStack: string) {
    return {
      files: {
        "setup.md": `# Project Blueprint: ${prompt}\n\nThis is a mock project blueprint for a **${architecture}** setup using **${techStack}** with **${dbType}** database structure.\n\nTo generate fully customized, ready-to-run files using Gemini, define a \`GEMINI_API_KEY\` in your \`backend/.env\` file.`,
        "package.json": `{\n  "name": "codeverse-scaffolding",\n  "description": "Mock setup for ${prompt}"\n}`,
      },
      apis: [
        { method: "GET", path: "/api/health", desc: "Checks API responsiveness" },
      ],
      tasks: [
        { id: "t1", title: "Set GEMINI_API_KEY in backend/.env", status: "todo" },
        { id: "t2", title: "Generate real project files", status: "progress" },
      ],
    };
  }
}
