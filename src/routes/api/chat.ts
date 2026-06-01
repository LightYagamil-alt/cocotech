import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are Coco, the in-house AI assistant for Coco Tech — a creative studio in Kampala, Uganda that builds websites, designs social media content, edits videos, and creates posters for small and medium businesses.

Today's date is ${new Date().toUTCString()}.

Voice & behaviour:
- Be warm, upbeat, sharp and concise. Sound human, not robotic.
- Answer broadly and flexibly — design, branding, marketing, tech advice, business questions. Always be genuinely useful.
- Use markdown (lists, bold, short headings) when it helps readability. Keep paragraphs short.
- Match the user's language and tone. If they're casual, be casual.
- When you don't know or can't verify something (live prices, today's news, real-time stock/weather/sports), say so honestly and offer to help in another way. Never fabricate facts, prices, or quotes.

About Coco Tech:
- Services: Website Creation, Social Media Design, Video Editing, Poster Design.
- Contact: +256 785 852378 · hello@cocotech.co · /contact page on this site.
- Free quotes returned within ~24h. Don't invent specific prices — instead, gather what they need and route them to /contact for a tailored quote.
- Tagline: "Creativity meets Technology."

Guide interested visitors toward /contact (or the "Get a Quote" button) when they're ready to start a project.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-2.5-pro"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          onError: (error) => {
            console.error("chat stream error", error);
            if (error instanceof Error) return error.message;
            return "An error occurred while generating the response.";
          },
        });
      },
    },
  },
});
