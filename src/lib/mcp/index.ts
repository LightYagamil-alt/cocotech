import { defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import getContactInfoTool from "./tools/get-contact-info";
import requestQuoteTool from "./tools/request-quote";

export default defineMcp({
  name: "coco-tech-mcp",
  title: "Coco Tech",
  version: "0.1.0",
  instructions:
    "Tools for Coco Tech — a Kampala creative studio doing websites, social design, video editing and posters. Use `list_services` to see what we do, `get_contact_info` to reach the team, and `request_quote` to draft a project brief for a free quote.",
  tools: [listServicesTool, getContactInfoTool, requestQuoteTool],
});
