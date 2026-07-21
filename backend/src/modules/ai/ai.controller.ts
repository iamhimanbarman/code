import { Controller, Post, Body } from "@nestjs/common";
import { AiService } from "./ai.service";

@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("tutor/optimize")
  async tutorOptimize(
    @Body() body: { code: string; language: string; mode: "optimize" | "debug" | "explain" }
  ) {
    return this.aiService.tutorOptimize(body.code, body.language, body.mode);
  }

  @Post("tutor/chat")
  async tutorChat(
    @Body() body: { prompt: string; history: Array<{ sender: "user" | "ai"; text: string }> }
  ) {
    const text = await this.aiService.tutorChat(body.prompt, body.history);
    return { text };
  }

  @Post("interview/chat")
  async interviewChat(
    @Body() body: {
      company: string;
      role: string;
      question: string;
      history: Array<{ sender: "bot" | "user"; text: string }>;
      newMessage: string;
    }
  ) {
    const text = await this.aiService.interviewChat(
      body.company,
      body.role,
      body.question,
      body.history,
      body.newMessage
    );
    return { text };
  }

  @Post("interview/submit")
  async interviewSubmit(
    @Body() body: {
      company: string;
      role: string;
      question: string;
      code: string;
      history: Array<{ sender: "bot" | "user"; text: string }>;
    }
  ) {
    return this.aiService.interviewSubmit(
      body.company,
      body.role,
      body.question,
      body.code,
      body.history
    );
  }

  @Post("project/generate")
  async projectGenerate(
    @Body() body: { prompt: string; architecture: string; dbType: string; techStack: string }
  ) {
    return this.aiService.projectGenerate(
      body.prompt,
      body.architecture,
      body.dbType,
      body.techStack
    );
  }

  @Post("skill/scan")
  async skillScan(@Body() body: { githubUrl: string }) {
    return this.aiService.skillScan(body.githubUrl);
  }
}
