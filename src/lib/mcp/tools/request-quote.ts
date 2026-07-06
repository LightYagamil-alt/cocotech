import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "request_quote",
  title: "Draft a Coco Tech project quote request",
  description:
    "Take a project brief and return a structured summary the client can send to Coco Tech via the /contact page. Does not submit anything on the client's behalf.",
  inputSchema: {
    service: z
      .enum(["website", "social-media", "video-editing", "poster", "other"])
      .describe("Which Coco Tech service the quote is for."),
    description: z.string().min(10).describe("Short project description or goal."),
    budgetRange: z.string().optional().describe("Optional budget range, e.g. '$500-$1000'."),
    deadline: z.string().optional().describe("Optional target deadline, natural language ok."),
    contactName: z.string().optional().describe("Client name, if known."),
    contactEmail: z.string().email().optional().describe("Client email, if known."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (input) => {
    const brief = {
      ...input,
      nextStep: "Send this brief via https://cocotech.lovable.app/contact — quotes return within ~24h.",
    };
    return {
      content: [
        {
          type: "text",
          text: `Draft quote request:\n\n${JSON.stringify(brief, null, 2)}\n\nSend it via the /contact page to receive a tailored quote within ~24h.`,
        },
      ],
      structuredContent: brief,
    };
  },
});
