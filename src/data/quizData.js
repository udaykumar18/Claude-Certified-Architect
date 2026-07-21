export const s2Questions = [
  {
    question: "You're building an agent with tools. Which approach will give Claude the most flexibility to handle unexpected requests?",
    options: [
      "Give Claude only one powerful tool",
      "Provide very specific tools like 'write_python_function' and 'debug_code'",
      "Provide abstract tools like 'read_file', 'write_file', and 'run_command'",
      "Provide tools that only work for planned scenarios",
    ],
    correct: 2,
    reason: "Abstract, general-purpose tools give Claude the building blocks to handle a wide range of situations — including ones you didn't plan for. Highly specific tools only work for that exact scenario. Think of abstract tools as primitives: Claude can combine read_file + run_command + write_file to solve almost any file-related task.",
  },
  {
    question: "You want Claude to write a report, then check if it's good enough, and improve it if needed. What pattern are you using?",
    options: [
      "Chaining workflow",
      "Evaluator-Optimizer pattern",
      "Parallelization workflow",
      "Routing workflow",
    ],
    correct: 1,
    reason: "The Evaluator-Optimizer pattern is specifically designed for generate → evaluate → improve loops. The key signal is 'check if it's good enough and improve if needed' — that's a loop with a quality gate, not a linear sequence.",
  },
  {
    question: "Your app generates different types of social media content. Programming topics need educational scripts, while sports topics need entertainment-focused content. What pattern should you use?",
    options: [
      "Route requests to specialized processing pipelines",
      "Use the same prompt for everything",
      "Ask users to write their own content",
      "Always use the entertainment approach",
    ],
    correct: 0,
    reason: "Routing is the right pattern when different input types require different handling logic. A classifier Claude call first identifies the topic, then routes to the appropriate specialized pipeline. Using one generic prompt for everything produces mediocre results for both types.",
  },
  {
    question: "Claude keeps ignoring some of your rules when you give it a long prompt with many requirements. What workflow approach would help?",
    options: [
      "Make the prompt even longer with more rules",
      "Run everything in parallel",
      "Use a routing workflow to categorize first",
      "Chain the task into focused sequential steps",
    ],
    correct: 3,
    reason: "Prompt Chaining solves this by breaking the task into smaller focused steps, each with only the relevant rules for that step. Each step gets Claude's full attention on a narrow set of requirements. Making the prompt even longer makes the problem worse.",
  },
  {
    question: "You need Claude to recommend the best material for a part by considering metal, plastic, ceramic, and wood options. What's the best approach?",
    options: [
      "Chain the evaluations one after another",
      "Ask Claude to pick randomly",
      "Send separate requests for each material type in parallel",
      "Put all criteria in one big prompt",
    ],
    correct: 2,
    reason: "Each material can be evaluated independently — no dependency between evaluating metal and evaluating wood. Perfect use case for parallelization (sectioning): run 4 simultaneous Claude calls, one per material, then aggregate. Chaining works but is slower.",
  },
  {
    question: "Reliability and predictable results are most important to you. Should you use a workflow or an agent?",
    options: [
      "Always use an agent for maximum flexibility",
      "Use a workflow since it's more reliable and testable",
      "Combine both approaches equally",
      "Use whichever is easier to code",
    ],
    correct: 1,
    reason: "Workflows have predetermined steps — the control flow is hardcoded, so the path is always the same. This makes them highly predictable, testable, and reliable. Agents decide their own next steps dynamically, introducing variability. When reliability is the top priority, workflows are the right choice.",
  },
  {
    question: "Users upload photos of damaged car parts and always get repair cost estimates. You know exactly what steps are needed each time. What should you use?",
    options: [
      "Multiple agents working together",
      "A single complex prompt",
      "An agent with many specialized tools",
      "A workflow with predetermined steps",
    ],
    correct: 3,
    reason: "The key signals: (1) the process is always the same, (2) you already know all the steps. This is exactly what a workflow is built for: a fixed, repeatable pipeline. Agents are for open-ended, unpredictable tasks. Using an agent here adds unnecessary complexity, latency, and cost.",
  },
];

export const s3Questions = [
  {
    question: "How can you tell if Claude wants to make another tool call in a conversation?",
    options: [
      "Check if the response contains the word 'tool'",
      "Check if the response is longer than usual",
      "Look at the stop_reason field for 'tool_use'",
      "Count the number of message blocks",
    ],
    correct: 2,
    reason: null,
  },
  {
    question: "When Claude uses a tool, what type of message structure does it return?",
    options: [
      "Multi-block messages with text and tool use blocks",
      "Simple text-only responses",
      "JSON data without any text",
      "Error messages only",
    ],
    correct: 0,
    reason: null,
  },
  {
    question: "What is the main purpose of a JSON schema when working with Claude tools?",
    options: [
      "To format the final response for users",
      "To tell Claude what arguments your function expects and how to use it",
      "To store the results of tool function calls",
      "To encrypt data between Claude and your server",
    ],
    correct: 1,
    reason: null,
  },
  {
    question: "What problem does the batch tool solve?",
    options: [
      "It makes tools run faster",
      "It translates tool results into different languages",
      "It reduces the number of back-and-forth communications when multiple tools are needed",
      "It automatically fixes errors in tool responses",
    ],
    correct: 2,
    reason: null,
  },
  {
    question: "What is the correct sequence of steps in the tool use workflow?",
    options: [
      "Initial Request → Tool Request → Data Retrieval → Final Response",
      "Tool Request → Initial Request → Final Response → Data Retrieval",
      "Final Response → Initial Request → Tool Request → Data Retrieval",
      "Data Retrieval → Tool Request → Initial Request → Final Response",
    ],
    correct: 0,
    reason: null,
  },
  {
    question: "Claude can only access information from its training data by default. What allows Claude to get current, real-time information?",
    options: [
      "Making educated guesses based on patterns",
      "Searching through its training data more carefully",
      "Asking the user to provide more details",
      "Using tools to access external information",
    ],
    correct: 3,
    reason: null,
  },
  {
    question: "What makes Claude's built-in text editor and web search tools different from custom tools?",
    options: [
      "Claude provides the schema, but you may still need to implement some functionality",
      "They require special API keys",
      "They only work with specific file types",
      "They cost more to use",
    ],
    correct: 0,
    reason: null,
  },
];

export const s4Questions = [
  {
    question: "You've created an MCP server and want to test your tools before connecting them to Claude. What's the best way to do this?",
    options: [
      "Testing isn't needed for tools, Claude can figure out how to use them",
      "Connect to Claude immediately",
      "Use the MCP Inspector in your browser",
      "Test in production",
    ],
    correct: 2,
    reason: "The MCP Inspector is a browser-based debugging tool that lets you connect directly to an MCP server, list its available tools, and invoke them manually — without needing Claude in the loop. Test tools work correctly in isolation first, then connect to Claude.",
  },
  {
    question: "You're building a document system where users can type @document_name to reference files. What MCP feature is best for exposing the document contents?",
    options: ["Tools", "Clients", "Prompts", "Resources"],
    correct: 3,
    reason: "MCP Resources are designed for exposing read-only data (files, database rows, document contents) that Claude or the user can reference. The @mention pattern is a classic Resources use case. Tools are for actions, Prompts are for pre-built instruction templates.",
  },
  {
    question: "Your MCP server and client need to communicate during development. What's the most common way they connect?",
    options: [
      "Through a database",
      "Over the internet",
      "Through standard input/output on the same machine",
      "Using email",
    ],
    correct: 2,
    reason: "During local development, MCP uses stdio transport — the client spawns the server as a subprocess and they communicate via stdin/stdout on the same machine. No networking required. HTTP + SSE is used for production/remote servers. Note: stdio cannot be used with the Anthropic MCP Connector (which requires public HTTP).",
  },
  {
    question: "You're building a chatbot that needs to access GitHub data. What is the main benefit of using MCP instead of writing your own GitHub integration?",
    options: [
      "MCP requires less memory",
      "MCP handles the tool definitions and execution for you",
      "MCP only works with GitHub",
      "MCP makes your chatbot run faster",
    ],
    correct: 1,
    reason: "Pre-built MCP servers come with all tool definitions (JSON schemas), execution logic, and API handling already implemented. You just connect to the server and Claude automatically receives the tool list — no need to manually write JSON schemas or implement API calls.",
  },
  {
    question: "You want to create a tool for your MCP server that reads document contents. Using the Python SDK, what's the easiest way to define this tool?",
    options: [
      "Write a complex JSON schema manually",
      "Send an HTTP request",
      "Use the @mcp.tool decorator on a function",
      "Create a separate configuration file",
    ],
    correct: 2,
    reason: "The MCP Python SDK provides the @mcp.tool decorator, which automatically generates the JSON schema from the function's type annotations and docstring. You write a regular Python function, add the decorator, and the SDK handles schema creation, registration, and routing.",
  },
  {
    question: "You want to provide users with a high-quality, pre-tested instruction for formatting documents. What MCP feature should you use?",
    options: ["Resources", "Sessions", "Tools", "Prompts"],
    correct: 3,
    reason: "MCP Prompts are pre-built, reusable prompt templates that the server exposes to clients. Ideal for storing curated instructions you've tested and want to serve consistently. Resources expose data content, Tools execute actions. Prompts are the right abstraction when sharing an instruction or template.",
  },
];

export const s6Questions = [
  {
    question: "What is the Files API used for?",
    options: [
      "Scanning files for viruses and malware",
      "Compressing large files to reduce API costs",
      "Converting files between different formats automatically",
      "Uploading files ahead of time and referencing them later instead of encoding them directly in messages",
    ],
    correct: 3,
    reason: "The Files API lets you upload a file once and reuse it across multiple requests by referencing its file ID, instead of re-encoding the full file content (e.g., base64) in every message. Especially useful for large or frequently reused documents.",
  },
  {
    question: "You're making many requests with the same large system prompt. What feature would make your requests faster and cheaper?",
    options: ["PDF processing", "Citations", "Extended thinking", "Prompt caching"],
    correct: 3,
    reason: "Prompt caching allows Claude to store and reuse previously processed content across requests. When the same prefix is reused, it avoids reprocessing those tokens — reducing both latency and cost significantly (up to 90% savings, minimum 1024 tokens required).",
  },
  {
    question: "What is the primary purpose of citations in Claude?",
    options: [
      "To create a clear trail from Claude's response back to specific parts of source documents",
      "To compress large documents for faster processing",
      "To count the number of words in a document",
      "To automatically generate footnotes for academic papers",
    ],
    correct: 0,
    wasWrong: true,
    reason: "Citations in Claude are designed to improve verifiability and trust. When enabled, Claude links specific claims back to exact passages in source documents, making it easy to trace where each piece of information came from. Not related to compression, word counting, or footnote generation.",
  },
  {
    question: "When Claude uses extended thinking, what two parts do you get in the response?",
    options: [
      "Reasoning process and final answer",
      "Problem and solution",
      "Input and output",
      "Question and answer",
    ],
    correct: 0,
    reason: "Extended thinking exposes Claude's internal reasoning. The response contains two parts: the thinking block (Claude's step-by-step reasoning) and the final text response (the actual answer). Gives developers visibility into how Claude arrived at its conclusion.",
  },
  {
    question: "You want Claude to analyze a PDF document. What's the main difference from sending an image?",
    options: [
      "Change the type to 'document' and media_type to 'application/pdf'",
      "PDFs cost more to process",
      "You can only send text, not images in PDFs",
      "PDFs require special permission",
    ],
    correct: 0,
    reason: "PDF documents are sent similarly to images in the API, but you must set type to 'document' and media_type to 'application/pdf'. Claude then processes the full document content, including text and embedded visuals.",
  },
  {
    question: "What is a key limitation of Claude's Code Execution tool?",
    options: [
      "It can only run JavaScript code",
      "It has no network access and runs in an isolated Docker container",
      "It requires users to provide their own execution environment",
      "It can only process text files",
    ],
    correct: 1,
    reason: "Claude's Code Execution tool runs code in a sandboxed, isolated Docker container. The code cannot make network requests or access external resources. The environment is self-contained, preventing side effects while still allowing computation and file manipulation.",
  },
  {
    question: "You want to cache your system prompt. What's the minimum requirement for caching to work?",
    options: [
      "You must make at least 5 requests",
      "You must use extended thinking",
      "The content must be under 500 tokens",
      "The content must be at least 1024 tokens long",
    ],
    correct: 3,
    reason: "Claude's prompt caching has a minimum token threshold — the cacheable content must be at least 1024 tokens. Content shorter than this is not eligible for caching. This minimum exists because caching overhead is only worthwhile for sufficiently large, reusable content blocks.",
  },
];
