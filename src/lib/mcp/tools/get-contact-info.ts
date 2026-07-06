import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact_info",
  title: "Get Coco Tech contact info",
  description: "Return Coco Tech's public contact details (phone, email, location, contact page URL).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contact = {
      company: "Coco Tech",
      tagline: "Creativity meets Technology.",
      location: "Kampala, Uganda",
      phone: "+256 785 852378",
      email: "hello@cocotech.co",
      contactPage: "/contact",
      leadership: ["Kwizera Solomon (Co-CEO)", "Mumbere Michael (Co-CEO)"],
      quoteTurnaround: "Free quotes returned within ~24h",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      structuredContent: contact,
    };
  },
});
