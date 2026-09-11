import {
    findProjectByName,
    getAllProjectsSummary,
    PROFILE,
    SKILLS,
    EDUCATION,
    SERVICES,
} from "./database";
import type OpenAI from "openai";

// Tool schemas — passed to OpenAI so the model knows what it can call
export const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
    {
        type: "function",
        function: {
            name: "get_project_details",
            description:
                "Get full details about ONE specific project by name when the user asks about a particular project (e.g. Mega Drive, CodeConnect, Examify, DocStream).",
            parameters: {
                type: "object",
                properties: {
                    projectName: {
                        type: "string",
                        description: "Name of the project the user is asking about",
                    },
                },
                required: ["projectName"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "list_all_projects",
            description:
                "Get a brief summary list of ALL projects. Use when the user asks 'what projects has he built' or similar general questions.",
            parameters: { type: "object", properties: {} },
        },
    },
    {
        type: "function",
        function: {
            name: "get_skills",
            description: "Get Mohnish's full technical skill set grouped by category.",
            parameters: { type: "object", properties: {} },
        },
    },
    {
        type: "function",
        function: {
            name: "get_education",
            description: "Get Mohnish's educational background and qualifications.",
            parameters: { type: "object", properties: {} },
        },
    },
    {
        type: "function",
        function: {
            name: "get_contact_info",
            description:
                "Get contact details (email, phone) — use when the user wants to hire, contact, or reach out to Mohnish.",
            parameters: { type: "object", properties: {} },
        },
    },
];

// Executes a tool call by name and returns a JSON string result
export function executeTool(name: string, args: Record<string, any>): string {
    switch (name) {
        case "get_project_details": {
            const project = findProjectByName(args.projectName ?? "");
            if (!project) {
                return JSON.stringify({
                    found: false,
                    message: `No project found matching "${args.projectName}". Available projects: ${getAllProjectsSummary()
                        .map((p) => p.name)
                        .join(", ")}`,
                });
            }
            return JSON.stringify({ found: true, project });
        }

        case "list_all_projects":
            return JSON.stringify({ projects: getAllProjectsSummary() });

        case "get_skills":
            return JSON.stringify(SKILLS);

        case "get_education":
            return JSON.stringify(EDUCATION);

        case "get_contact_info":
            return JSON.stringify({
                email: PROFILE.email,
                phone: PROFILE.phone,
                availableForWork: PROFILE.availableForWork,
            });

        default:
            return JSON.stringify({ error: `Unknown tool: ${name}` });
    }
}

// SERVICES export re-exposed in case a future tool needs it
export { SERVICES };