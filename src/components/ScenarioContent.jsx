export function S1Content() {
  return (
    <div className="content">
      <h2>What is This Scenario About?</h2>
      <p>
        A mid-size SaaS company routes incoming support tickets through Claude. Claude classifies
        the ticket type, attempts resolution using a knowledge base, and escalates to a human agent
        when it can't resolve or when the situation demands it. This scenario combines{' '}
        <strong>routing + tool use + HITL + agentic loop</strong> in a single real-world system.
      </p>

      <h2>Pattern 1 — Routing (Classify First, Then Dispatch)</h2>
      <p>The first Claude call is a <strong>classifier</strong> — it reads the ticket and decides which handler should process it:</p>
      <pre><code>{`# Step 1 — classify with Haiku (fast + cheap)
classification = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=50,
    system="Classify this support ticket. Reply with exactly one word: billing, technical, general, or sensitive.",
    messages=[{"role": "user", "content": ticket_text}]
)
ticket_type = classification.content[0].text.strip()

# Step 2 — route to the right handler
if ticket_type == "billing":
    response = billing_handler(ticket_text, user_id)
elif ticket_type == "sensitive":
    escalate_to_human(ticket_text, reason="sensitive topic")`}</code></pre>
      <div className="callout">
        <strong>Why Haiku for classification:</strong> Fast and cheap. Classification is a simple
        task — save Opus for the actual resolution step where complex reasoning is needed.
      </div>

      <h2>Pattern 2 — Tool Use for KB Lookup</h2>
      <p>Claude never answers from training data — it always fetches the actual current policy from your knowledge base via tools:</p>
      <table>
        <thead><tr><th>Tool</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>search_knowledge_base(query)</code></td><td>Find policy docs for a support question</td></tr>
          <tr><td><code>get_account_info(user_id)</code></td><td>Retrieve account details</td></tr>
          <tr><td><code>escalate_to_human(reason, priority, summary)</code></td><td>Hand off to human agent</td></tr>
        </tbody>
      </table>

      <h2>Pattern 3 — Escalation Logic (Exam-Critical)</h2>
      <table>
        <thead><tr><th>Escalate IMMEDIATELY (no attempt)</th><th>Escalate AFTER ATTEMPT</th></tr></thead>
        <tbody>
          <tr><td>Sensitive topics (legal, fraud, billing disputes)</td><td>Claude confidence is low</td></tr>
          <tr><td>Explicit human request ("talk to a person")</td><td>Resolution failed after N turns</td></tr>
          <tr><td>VIP / enterprise customers (per policy)</td><td>Issue requires account action Claude can't take</td></tr>
        </tbody>
      </table>
      <div className="callout">
        When escalating, Claude always provides a <strong>handoff summary</strong> — the human agent gets full context instantly.
      </div>

      <h2>Pattern 4 — Conversation State Management</h2>
      <p><strong>Claude has no memory</strong> — send the full <code>conversation_history</code> on every API call. Without it, Claude won't know what was already tried.</p>
      <pre><code>{`response = client.messages.create(
    ...
    messages=conversation_history   # ← full history every time
)`}</code></pre>

      <h2>Pattern 5 — HITL Checkpoints</h2>
      <p>Build explicit checkpoints before irreversible actions:</p>
      <ul>
        <li>Issuing refunds above a threshold</li>
        <li>Account deletion</li>
        <li>Plan downgrades / cancellations</li>
        <li>Waiving late fees, unlocking banned accounts</li>
      </ul>

      <h2>Model Selection Strategy</h2>
      <table>
        <thead><tr><th>Step</th><th>Model</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Classification</td><td>claude-haiku-4-5</td><td>Fast, cheap — simple categorization</td></tr>
          <tr><td>KB search query</td><td>claude-haiku-4-5</td><td>Simple reformulation task</td></tr>
          <tr><td>Resolution / response</td><td>claude-opus-4-8</td><td>Complex reasoning, empathetic tone</td></tr>
          <tr><td>Escalation summary</td><td>claude-haiku-4-5</td><td>Simple summarization</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export function S2Content() {
  return (
    <div className="content">
      <h2>What is an AI Agent?</h2>
      <p>
        An <strong>AI Agent</strong> is a system where an LLM (Claude) autonomously:{' '}
        <strong>Perceives</strong> its environment → <strong>Decides</strong> what action to take →{' '}
        <strong>Acts</strong> using tools → <strong>Loops</strong> until the task is done.
      </p>
      <div className="callout">
        Key distinction from a simple API call: an agent <strong>drives itself</strong> through
        multiple steps. A regular call is one shot — you ask, Claude answers. An agent keeps going
        until done.
      </div>

      <h2>The Agentic Loop</h2>
      <pre><code>{`User gives task → Claude receives input + available tools
  Decides:
  → Call a tool?  → yes → Tool executes → result back → loop
  → Answer directly? → stop_reason: "end_turn" → done

stop_reason "tool_use"  → keep looping
stop_reason "end_turn"  → task complete

YOUR APPLICATION runs the loop — Claude doesn't loop itself`}</code></pre>

      <h2>Agent Memory Types</h2>
      <table>
        <thead><tr><th>Type</th><th>Where stored</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td><strong>In-context</strong></td><td>Active messages array</td><td>Lost after session ends</td></tr>
          <tr><td><strong>External storage</strong></td><td>Database / vector store</td><td>Retrieved via tool calls (RAG) — survives sessions</td></tr>
          <tr><td><strong>In-cache</strong></td><td>Prompt cache (KV cache)</td><td>Cached system prompt — fast, 5-min TTL</td></tr>
          <tr><td><strong>In-weights</strong></td><td>Model fine-tuning</td><td>Baked into model — expensive, static, rare</td></tr>
        </tbody>
      </table>

      <h2>The 5 Core Workflow Patterns</h2>
      <h3>1. Prompt Chaining (Sequential Pipeline)</h3>
      <pre><code>{`Input → [Step 1] → output1 → [Step 2] → output2 → [Step 3] → Final`}</code></pre>
      <p>Each step depends on the previous result. Best for: multi-step tasks with linear sequence. Example: Research → Outline → Draft → Edit → Publish</p>

      <h3>2. Parallelization</h3>
      <p><strong>Sectioning:</strong> Split work across independent workers running simultaneously.</p>
      <p><strong>Voting:</strong> Same task run by multiple independent Claude instances — pick best result.</p>

      <h3>3. Routing</h3>
      <p>A first Claude call classifies the input → routes to a specialized handler. Best for varied inputs needing different logic.</p>

      <h3>4. Orchestrator + Subagents</h3>
      <p><strong>Orchestrator</strong> = manager Claude that plans and delegates. <strong>Subagents</strong> = specialized Claude instances doing focused work.</p>

      <h3>5. Evaluator-Optimizer (Loop Pattern)</h3>
      <pre><code>{`Input → [Generator] → draft → [Evaluator]
  "not good enough" → back to Generator
  "good enough" → Output`}</code></pre>

      <h2>Agents vs. Workflows</h2>
      <table>
        <thead><tr><th></th><th>Workflow</th><th>Agent</th></tr></thead>
        <tbody>
          <tr><td>Control flow</td><td>Predetermined (hardcoded)</td><td>Dynamic (Claude decides)</td></tr>
          <tr><td>Predictability</td><td>High — same steps always</td><td>Lower — path varies</td></tr>
          <tr><td>Best for</td><td>Repeatable processes</td><td>Open-ended tasks</td></tr>
        </tbody>
      </table>
      <div className="callout">
        Most real systems are <strong>hybrid</strong> — fixed outer workflow with agentic loops inside certain steps.
      </div>

      <h2>Multi-Agent Trust & Safety</h2>
      <ul>
        <li>Subagents should <strong>not blindly trust</strong> orchestrator instructions — apply own safety checks</li>
        <li><strong>Prompt injection risk:</strong> Malicious content in tool results could try to hijack agent behavior</li>
        <li><strong>Minimal footprint:</strong> Request only needed permissions, prefer reversible actions</li>
      </ul>
    </div>
  );
}

export function S3Content() {
  return (
    <div className="content">
      <h2>What is This Scenario About?</h2>
      <p>
        Claude Code acting as an autonomous coding agent — reading your codebase, making changes
        across multiple files, running tests to verify, and creating PRs. You give one high-level
        instruction; Claude drives itself through the full implementation using its built-in tools.
      </p>

      <h2>Claude Code's 7 Built-in Tools</h2>
      <table>
        <thead><tr><th>Tool</th><th>What it does</th><th>Example use</th></tr></thead>
        <tbody>
          <tr><td><strong>Read</strong></td><td>Read any file's contents</td><td>Understand existing code before changing it</td></tr>
          <tr><td><strong>Write</strong></td><td>Create or fully overwrite a file</td><td>Create a new module or config file</td></tr>
          <tr><td><strong>Edit</strong></td><td>Targeted change to part of a file</td><td>Update a function without rewriting the whole file</td></tr>
          <tr><td><strong>Bash</strong></td><td>Run any shell command</td><td>pytest, git, npm, grep, curl</td></tr>
          <tr><td><strong>Glob</strong></td><td>Find files matching a pattern</td><td>src/**/*.py — find all Python files</td></tr>
          <tr><td><strong>Grep</strong></td><td>Search for text/regex across files</td><td>Find all usages of a function</td></tr>
          <tr><td><strong>TodoWrite</strong></td><td>Track tasks in a long session</td><td>Break big task into subtasks, check them off</td></tr>
        </tbody>
      </table>
      <div className="callout">
        <strong>Key exam point:</strong> These are built-in — you don't define JSON schemas. Claude picks the right tool automatically.
      </div>

      <h2>Read vs Edit vs Write</h2>
      <table>
        <thead><tr><th>Tool</th><th>When to use</th></tr></thead>
        <tbody>
          <tr><td><strong>Read</strong></td><td>Always first — understand before changing</td></tr>
          <tr><td><strong>Edit</strong></td><td>Targeted change — safer, preserves the rest (preferred for existing files)</td></tr>
          <tr><td><strong>Write</strong></td><td>Full file creation or complete rewrite — replaces everything</td></tr>
        </tbody>
      </table>

      <h2>PR Automation — Full Workflow</h2>
      <pre><code>{`claude -p "Add input validation to all POST endpoints and open a PR"

Internal steps:
Glob + Grep → find all POST endpoint handlers
Read        → understand each handler
Edit        → add validation logic
Bash        → pytest tests/ (verify)
Bash        → git checkout -b feature/input-validation
Bash        → git add src/routes/
Bash        → git commit -m "Add input validation"
Bash        → git push origin feature/input-validation
Bash        → gh pr create --title "Add input validation" --body "..."`}</code></pre>

      <h2>The Agentic Coding Loop</h2>
      <pre><code>{`Receive instruction
     ↓
Pick next tool: Read / Edit / Write / Bash / Glob ...
     ↓
stop_reason = "tool_use"  → execute tool → result back → pick next tool
stop_reason = "end_turn"  → task complete

Your app or the Claude Code CLI runs this loop — Claude doesn't loop itself`}</code></pre>
    </div>
  );
}

export function S4Content() {
  return (
    <div className="content">
      <h2>CLAUDE.md — Persistent Project Context</h2>
      <p>
        <code>CLAUDE.md</code> is a markdown file Claude Code reads{' '}
        <strong>automatically at the start of every session</strong>. It's the persistent system
        prompt for your project — conventions, commands, architecture notes, anything Claude needs
        to work effectively.
      </p>

      <h2>CLAUDE.md Hierarchy (Exam-Critical)</h2>
      <table>
        <thead><tr><th>Level</th><th>Location</th><th>Scope</th></tr></thead>
        <tbody>
          <tr><td>1 — Global</td><td><code>~/.claude/CLAUDE.md</code></td><td>Applies to ALL projects on your machine (personal preferences)</td></tr>
          <tr><td>2 — Project Root</td><td><code>~/myproject/CLAUDE.md</code></td><td>Applies to this project only — committed to git, shared with team</td></tr>
          <tr><td>3 — Subdirectory</td><td><code>~/myproject/src/CLAUDE.md</code></td><td>Applies only when Claude is working in /src</td></tr>
        </tbody>
      </table>
      <div className="callout"><strong>Merge order:</strong> Subdirectory overrides Project, Project overrides Global.</div>
      <pre><code>{`Global:      "Always use TypeScript"
Project:     "This project uses Python"       ← overrides global
Subdir /ui:  "This folder uses TypeScript"    ← overrides project for /ui only`}</code></pre>

      <h2>Custom Slash Commands</h2>
      <p>
        Slash commands are <strong>reusable prompt shortcuts</strong> stored as markdown files in{' '}
        <code>.claude/commands/*.md</code>. Type <code>/command</code> in Claude Code and it runs
        your pre-written prompt.
      </p>
      <table>
        <thead><tr><th>Location</th><th>Scope</th></tr></thead>
        <tbody>
          <tr><td><code>.claude/commands/review.md</code></td><td>Project-level — shared via git</td></tr>
          <tr><td><code>~/.claude/commands/standup.md</code></td><td>Personal — not in git</td></tr>
        </tbody>
      </table>
      <p><strong><code>$ARGUMENTS</code></strong> in a command file = placeholder for what you type after the command name.</p>
      <pre><code>{`# .claude/commands/ticket.md
Look up ticket $ARGUMENTS in our codebase.
Find all files that need to change to implement this ticket.

Usage: /ticket PROJ-123`}</code></pre>

      <h2>MCP — Model Context Protocol</h2>
      <p>MCP is an open protocol that lets Claude connect to external tools and data sources via standardized servers.</p>
      <table>
        <thead><tr><th>Component</th><th>Role</th></tr></thead>
        <tbody>
          <tr><td><strong>MCP Server</strong></td><td>Exposes Tools, Resources, and Prompts. Can be third-party (GitHub, Linear) or custom-built.</td></tr>
          <tr><td><strong>MCP Client</strong></td><td>Discovery layer — connects to servers, lists available capabilities, routes requests.</td></tr>
          <tr><td><strong>MCP Connector</strong></td><td>Anthropic's built-in API feature to connect Claude.ai directly to MCP servers (requires public HTTP).</td></tr>
        </tbody>
      </table>

      <h3>MCP Server Capabilities</h3>
      <table>
        <thead><tr><th>Capability</th><th>What it is</th><th>Who invokes it</th></tr></thead>
        <tbody>
          <tr><td><strong>Tools</strong></td><td>Functions Claude can call (actions)</td><td>Claude autonomously</td></tr>
          <tr><td><strong>Resources</strong></td><td>Read-only data (files, DB rows, docs)</td><td>User or app via @mention</td></tr>
          <tr><td><strong>Prompts</strong></td><td>Pre-built prompt templates</td><td>User explicitly in client UI</td></tr>
        </tbody>
      </table>

      <h3>Transport Types</h3>
      <table>
        <thead><tr><th>Transport</th><th>When to use</th></tr></thead>
        <tbody>
          <tr><td><strong>stdio</strong></td><td>Local development — client spawns server as subprocess. Cannot use with MCP Connector (requires public HTTP).</td></tr>
          <tr><td><strong>HTTP + SSE</strong></td><td>Production / remote servers — server runs as web service.</td></tr>
        </tbody>
      </table>

      <h2>.claude/settings.json</h2>
      <pre><code>{`{
  "permissions": {
    "allow": ["Bash(pytest:*)", "Bash(git diff:*)", "Read(**)", "Write(src/**)"],
    "deny":  ["Bash(rm -rf:*)", "Write(.env)"]
  },
  "mcpServers": { ... }
}`}</code></pre>
    </div>
  );
}

export function S5Content() {
  return (
    <div className="content">
      <h2>What is This Scenario About?</h2>
      <p>
        Running Claude Code <strong>automatically inside a CI/CD pipeline</strong> — triggered by a
        git push or PR — with no human present. Claude acts as an agent that reads your codebase,
        reviews changes, generates tests, or gives PR feedback, then outputs structured results your
        pipeline can act on.
      </p>

      <h2>Key Concept 1 — The -p Flag (Headless Mode)</h2>
      <p><code>-p</code> turns Claude Code from interactive chat into a <strong>one-shot CLI command</strong>:</p>
      <pre><code>{`# Interactive mode
claude

# Headless — one prompt, result to stdout, then exits
claude -p "Review this PR for security vulnerabilities"`}</code></pre>
      <p>No terminal UI, no waiting for user input. Compatible with any CI/CD system (GitHub Actions, GitLab CI, Jenkins).</p>

      <h2>Key Concept 2 — --output-format json</h2>
      <pre><code>{`{
  "type": "result",
  "result": "Found 2 issues:\\n1. SQL injection risk at line 47...",
  "session_id": "sess_abc123",
  "cost_usd": 0.042,
  "duration_ms": 3200,
  "num_turns": 1
}

# Extract just the review text
claude -p "Review this PR" --output-format json | jq -r '.result'`}</code></pre>

      <h2>Key Concept 3 — Session Isolation</h2>
      <p>Each CI job spawns a <strong>completely fresh Claude Code process</strong> with zero memory of previous runs.</p>
      <div className="callout">
        <strong>Exam principle:</strong> The session that generated the code should NOT review its own code. A fresh session sees only the code as written — not the reasoning behind it. This gives an unbiased review.
      </div>

      <h2>Key Concept 4 — --resume (Chaining Steps)</h2>
      <pre><code>{`# Step 1 — analyze, save session ID
SESSION=$(claude -p "Analyze this PR's architecture changes" \\
  --output-format json | jq -r '.session_id')

# Step 2 — resume that session for follow-up
claude -p "Now generate unit tests for the changes you just analyzed" \\
  --resume "$SESSION" --output-format json | jq -r '.result'`}</code></pre>
      <p>Each session holds up to <strong>200,000 tokens</strong> of context.</p>

      <h2>Key Concept 5 — --permission-mode bypassPermissions</h2>
      <p>In a pipeline, nobody is there to approve prompts — this flag skips all approval dialogs. <strong>Use only in CI</strong> where the environment is already locked down.</p>

      <h2>Key Concept 6 — --allowedTools (Least Privilege)</h2>
      <pre><code>{`# Code review job — only needs to READ, not write anything
claude -p "Review this PR for bugs" --allowedTools "Read,Bash"

# Test generation job — needs to write new test files
claude -p "Generate missing unit tests" --allowedTools "Read,Write,Bash"`}</code></pre>
      <div className="callout">
        Limiting tools = limiting blast radius. This is the <strong>minimal footprint principle</strong> applied to CI.
      </div>

      <h2>Full GitHub Actions Example</h2>
      <pre><code>{`name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - run: npm install -g @anthropic-ai/claude-code
      - name: Run Claude Review
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          REVIEW=$(claude -p "Review this PR for bugs and security issues." \\
            --output-format json \\
            --allowedTools "Read,Bash" \\
            --permission-mode bypassPermissions \\
            | jq -r '.result')
          echo "$REVIEW" > review_output.txt
      - name: Post Review as PR Comment
        uses: actions/github-script@v7
        with:
          script: |
            const review = require('fs').readFileSync('review_output.txt', 'utf8')
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner, repo: context.repo.repo,
              body: \`## Claude Code Review\\n\\n\${review}\`
            })`}</code></pre>
      <div className="callout">ANTHROPIC_API_KEY is stored in <strong>GitHub Secrets</strong> — never hardcoded in the YAML.</div>

      <h2>Minimizing False Positives</h2>
      <ul>
        <li><strong>Narrow the prompt</strong> — "only flag security vulnerabilities, not style issues"</li>
        <li><strong>Add confidence qualifier</strong> — "only report issues you are highly confident about"</li>
        <li><strong>Use CLAUDE.md</strong> — gives Claude project context, prevents flagging intentional patterns</li>
        <li><strong>Scope with --allowedTools</strong> — focused toolset leads to focused review</li>
      </ul>
    </div>
  );
}

export function S6Content() {
  return (
    <div className="content">
      <h2>What is This Scenario About?</h2>
      <p>
        Parsing messy, unstructured documents — PDFs, emails, invoices, reports — into clean,
        validated, structured JSON. The core challenge is <strong>reliability</strong>: Claude must
        not invent data that isn't in the document.
      </p>

      <h2>Core Pattern — Force Structured Output via Tool Use</h2>
      <pre><code>{`response = client.messages.create(
    model="claude-opus-4-8",
    tools=[{
        "name": "extract_invoice",
        "description": "Extract invoice data from the document",
        "input_schema": {
            "type": "object",
            "properties": {
                "invoice_number": {"type": "string"},
                "amount":         {"type": "number"},
                "vendor_name":    {"type": "string"},
                "date":           {"type": "string"},
                "discount_code":  {"type": ["string", "null"],
                                   "description": "null if not found"}
            },
            "required": ["invoice_number", "amount", "vendor_name", "date"]
        }
    }],
    tool_choice={"type": "tool", "name": "extract_invoice"},  # ← force the call
    messages=[...]
)
extracted = response.content[0].input  # clean dict, ready to use`}</code></pre>
      <div className="callout">
        <strong>tool_choice: {"{"}"type": "tool", "name": "..."{"}"} is exam-critical</strong> — it forces Claude to always return structured output, never free text.
      </div>

      <h2>Nullable Fields — Hallucination Prevention (Most Important)</h2>
      <p><strong>The Problem:</strong> If a field is <code>required</code> but absent from the document, Claude will <strong>make something up</strong>.</p>
      <p><strong>The Fix:</strong> Allow null for optional fields:</p>
      <pre><code>{`"discount_code": {
    "type": ["string", "null"],
    "description": "Discount code if present, null if not found in document"
}`}</code></pre>
      <div className="callout">
        Always give Claude a way to say "this field isn't here." Required field missing from doc → hallucination. Nullable field missing → returns null.
      </div>

      <h2>Citations — Trace Every Value Back to Source</h2>
      <pre><code>{`messages=[{"role": "user", "content": [
    {
        "type": "document",
        "source": {"type": "text", "media_type": "text/plain", "data": document_text},
        "citations": {"enabled": True}   # ← enable citations
    },
    {"type": "text", "text": "Extract the invoice data using the extract_invoice tool"}
]}]`}</code></pre>
      <p>Critical for audit trails — users can verify Claude pulled values from the actual document.</p>

      <h2>Batch API — 10,000 Documents at Once</h2>
      <table>
        <thead><tr><th></th><th>Individual Requests</th><th>Batch API</th></tr></thead>
        <tbody>
          <tr><td>Cost</td><td>Full price</td><td><strong>50% cheaper</strong></td></tr>
          <tr><td>Speed</td><td>Synchronous</td><td>Async — up to 24 hours</td></tr>
          <tr><td>Max requests</td><td>1 per call</td><td><strong>10,000 per batch</strong></td></tr>
          <tr><td>Best for</td><td>Real-time, user-facing</td><td>Background processing</td></tr>
        </tbody>
      </table>

      <h2>Prompt Engineering for Accurate Extraction</h2>
      <ul>
        <li>Always define "not found": <em>"If a field is not present, return null. Do not infer or make up values."</em></li>
        <li>Specify exact formats: <em>"date must be YYYY-MM-DD, amount must be a number without currency symbols"</em></li>
        <li>One schema per document type — don't use one giant schema for all types</li>
        <li>Use few-shot examples in tool descriptions</li>
      </ul>
    </div>
  );
}
