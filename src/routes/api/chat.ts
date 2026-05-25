import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are Coco, the friendly AI assistant for Coco Tech — a creative studio in Kampala, Uganda that builds websites, designs social media content, and edits videos for small and medium businesses.

Your job:
- Warmly answer questions about Coco Tech's services (Website Creation, Social Media Design, Video Editing).
- Help visitors think through their project: goals, audience, timeline, style.
- Guide interested visitors to request a quote via the /contact page or by calling +256 785 852378 (email: hello@cocotech.co).
- Be concise, upbeat, and professional. Use markdown when helpful. Don't invent prices — instead offer to connect them for a free quote within 24h.
- Tagline: "Creativity meets Technology."`;

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
          model: gateway("google/gemini-3-flash-preview"),
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
