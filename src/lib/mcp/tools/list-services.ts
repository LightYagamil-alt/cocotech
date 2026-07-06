import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "list_services",
  title: "List Coco Tech services",
  description: "Return the list of creative services Coco Tech offers, with short descriptions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const services = [
      { name: "Website Creation", summary: "Custom websites for small and medium businesses." },
      { name: "Social Media Design", summary: "Branded feed graphics, stories and campaign assets." },
      { name: "Video Editing", summary: "Reels, launch videos and short-form edits." },
      { name: "Poster Design", summary: "Event, product and marketing posters." },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
      structuredContent: { services },
    };
  },
});
