import { useState } from 'react';

const TABS = [
  { id: 'intro',       label: 'Overview' },
  { id: 'patterns',   label: '4 Patterns' },
  { id: 'decompose',  label: 'Decomposition' },
  { id: 'selection',  label: 'Pattern Selection' },
  { id: 'workflow',   label: 'Workflow Sub-Patterns' },
  { id: 'primitives', label: '7 Primitives' },
  { id: 'orch',       label: 'Orchestration' },
  { id: 'model',      label: 'Model & Context' },
  { id: 'tells',      label: 'Exam Tells' },
];

function Callout({ children, type = 'info' }) {
  const colors = {
    info:    { bg: 'var(--accent-dim)',           border: 'var(--accent)',  text: 'var(--accent-text)' },
    warn:    { bg: 'rgba(251,191,36,0.1)',         border: '#FBBF24',       text: '#FDE68A' },
    danger:  { bg: 'rgba(248,113,113,0.1)',        border: '#F87171',       text: '#FCA5A5' },
    ok:      { bg: 'rgba(74,222,128,0.1)',         border: 'var(--ok)',     text: 'var(--ok)' },
  };
  const c = colors[type];
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderLeft: `3px solid ${c.border}`,
      borderRadius: 8, padding: '12px 16px',
      fontSize: '0.83rem', color: c.text, lineHeight: 1.65, margin: '16px 0',
    }}>
      {children}
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0', borderRadius: 8, border: '1px solid var(--line)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{ padding: '9px 14px', textAlign: 'left', background: 'var(--raised)', borderBottom: '1px solid var(--line)', color: 'var(--ink-2)', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--line-sm)' : 'none' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '10px 14px', color: j === 0 ? 'var(--ink)' : 'var(--ink-2)', fontWeight: j === 0 ? 600 : 400, verticalAlign: 'top', lineHeight: 1.55 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid var(--line)' }}>{title}</h2>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 10, maxWidth: '72ch' }}>{children}</p>;
}

function PatternCard({ name, signal, when, trap, color }) {
  return (
    <div style={{ padding: '16px 20px', borderRadius: 10, background: 'var(--surface)', border: `1px solid ${color}`, marginBottom: 12, boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color, flex: 1 }}>{name}</span>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: `${color}22`, color, border: `1px solid ${color}` }}>Pattern</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', minWidth: 90, letterSpacing: '0.04em', textTransform: 'uppercase', paddingTop: 2 }}>Pick when</span>
          <span style={{ fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{when}</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', minWidth: 90, letterSpacing: '0.04em', textTransform: 'uppercase', paddingTop: 2 }}>Signal</span>
          <span style={{ fontSize: '0.83rem', color, fontStyle: 'italic', lineHeight: 1.55 }}>"{signal}"</span>
        </div>
        {trap && (
          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FBBF24', minWidth: 90, letterSpacing: '0.04em', textTransform: 'uppercase', paddingTop: 2 }}>⚠ Trap</span>
            <span style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.55 }}>{trap}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TAB CONTENT ──────────────────────────────────────────────

function TabIntro() {
  return (
    <div>
      <Section title="What This Domain Tests">
        <P>Domain 1 is about picking the <strong>right architecture for the job</strong> — not the most sophisticated one. The exam consistently rewards the simplest pattern that satisfies the stated requirements and penalises over-engineering.</P>
        <P>Every question in this domain gives you a scenario and asks you to match it to a pattern, identify a missing component, or diagnose why an existing design fails. The deciding signal is always in the scenario text.</P>
        <Callout type="info">
          <strong>Core principle:</strong> Autonomy you don't need is cost and risk you don't need. Always choose the simplest pattern that meets the requirement — then stop.
        </Callout>
      </Section>

      <Section title="The Full Architecture Spectrum">
        <P>All Claude-powered systems sit on a spectrum from low autonomy (predictable, auditable) to high autonomy (adaptive, self-recovering). Choosing the wrong point on this spectrum is the root cause of most architecture failures.</P>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, margin: '16px 0', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)' }}>
          {[
            { label: 'Single augmented call', sub: 'One transform', color: '#818CF8', desc: 'Highest predictability\nLowest autonomy' },
            { label: 'Fixed workflow', sub: 'Known steps', color: '#34D399', desc: 'Auditable\nReproducible' },
            { label: 'Autonomous agent', sub: 'Runtime path', color: '#FBBF24', desc: 'Adaptive\nSelf-recovering' },
            { label: 'Multi-agent', sub: 'Specialised peers', color: '#F87171', desc: 'Parallel\nHighest complexity' },
          ].map((p, i) => (
            <div key={p.label} style={{ flex: 1, padding: '14px 12px', background: i % 2 === 0 ? 'var(--raised)' : 'var(--surface)', borderRight: i < 3 ? '1px solid var(--line)' : 'none', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: p.color, marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginBottom: 8 }}>{p.sub}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--faint)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{p.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.72rem', color: 'var(--muted)', margin: '4px 0 0' }}>
          <span>← Low autonomy / high predictability</span>
          <div style={{ flex: 1, height: 2, background: 'linear-gradient(to right, #818CF8, #F87171)', borderRadius: 1 }} />
          <span>High autonomy / low predictability →</span>
        </div>
      </Section>

      <Section title="Business Value Pillars">
        <P>Every architecture decision maps to one or more business outcomes. The exam sometimes frames questions around these — identify the pillar being served, then pick the pattern that delivers it reliably.</P>
        <Table
          headers={['Pillar', 'What it means', 'Architecture implication']}
          rows={[
            ['Efficiency', 'Same output, less human time', 'Automate repeatable steps; fixed workflow'],
            ['Transformation', 'Work previously impossible', 'Autonomous agent or multi-agent'],
            ['Productivity', 'Humans do more with AI assist', 'Augmented call or skill-based assist'],
            ['Cost reduction', 'Lower operational spend', 'Right-size model; progressive context; caching'],
            ['SLA / reliability', 'Consistent quality at scale', 'Evals before rollout; circuit breakers; fallbacks'],
          ]}
        />
      </Section>
    </div>
  );
}

function TabPatterns() {
  return (
    <div>
      <Section title="The 4 Architecture Patterns">
        <P>These are the most tested concept in D1. For every exam question, identify the scenario's shape — then match it to the pattern. The signal phrase in the question text always points to the right answer.</P>

        <PatternCard
          name="Single Augmented LLM Call"
          when="One input → one output transformation, even if retrieval, a glossary, or context is supplied alongside it."
          signal="using the retrieved / provided / supplied context"
          trap="Adding retrieval to a single call does not make it a workflow. If it's still one transform — one model call producing one result — it's still a single augmented call. Context ≠ workflow."
          color="#818CF8"
        />
        <PatternCard
          name="Fixed Workflow"
          when="Steps are known in advance, identical every run. Auditability, reproducibility, or compliance requires every step to be logged."
          signal="same steps every time · known in advance · reproducible · audit trail required"
          trap="Don't upgrade to an agent just because the task is complex. If you can write the steps out before execution, use a workflow."
          color="#34D399"
        />
        <PatternCard
          name="Autonomous Agent"
          when="The next step only becomes clear mid-task (at runtime). The system must recover from unexpected results on its own."
          signal="only becomes clear mid-task · recover on its own · path depends on what it finds · emergent"
          trap="Autonomous agents must still be bounded in production: constrained tool entry points, per-turn budgets, explicit permissions, defined stopping criteria."
          color="#FBBF24"
        />
        <PatternCard
          name="Multi-Agent"
          when="Subtasks require distinct specialisations, tools, or context isolation — or the subtasks can run in parallel."
          signal="different specialists · separate tools per task · run in parallel · distinct context per agent"
          trap="Multi-agent is not just 'two agents doing more work'. Each agent must have a distinct role with its own tools and context. If you can collapse them into one agent without loss, do it."
          color="#F87171"
        />

        <Callout type="warn">
          <strong>Most common mistake:</strong> Upgrading to a more complex pattern because the task feels hard. The question tells you the constraint — match the pattern to the constraint, not to the complexity.
        </Callout>
      </Section>

      <Section title="Pattern Comparison at a Glance">
        <Table
          headers={['', 'Single call', 'Fixed workflow', 'Autonomous agent', 'Multi-agent']}
          rows={[
            ['Steps known upfront?', '— (one step)', '✓ Yes', '✗ No', '✗ No'],
            ['Self-recovery needed?', '✗ No', '✗ No', '✓ Yes', 'Partial'],
            ['Parallel subtasks?', '✗ No', 'Sometimes', '✗ No', '✓ Yes'],
            ['Predictability', 'Highest', 'High', 'Low', 'Low'],
            ['Audit/reproducibility', 'Easy', 'Easy', 'Hard', 'Hard'],
            ['Cost', 'Lowest', 'Low', 'High', 'Highest'],
          ]}
        />
      </Section>
    </div>
  );
}

function TabDecompose() {
  return (
    <div>
      <Section title="Decompose Before You Architect">
        <P>Before choosing any pattern, split the problem into three ownership buckets. This forces clarity on what the AI actually needs to do — which almost always reveals a simpler pattern than your first instinct.</P>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '16px 0' }}>
          {[
            { label: 'Claude handles', color: '#818CF8', items: ['Judgment calls', 'Natural language understanding', 'Generation & summarisation', 'Classification & routing', 'Reasoning under ambiguity'] },
            { label: 'Existing systems handle', color: '#34D399', items: ['Database reads/writes', 'Business logic & rules', 'Auth & permissions', 'Deterministic calculations', 'Audit logging'] },
            { label: 'Humans handle', color: '#FBBF24', items: ['Irreversible high-impact decisions', 'Novel edge cases', 'Policy exceptions', 'Final approval on sensitive actions', 'Escalations'] },
          ].map(b => (
            <div key={b.label} style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--surface)', border: `1px solid ${b.color}40` }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: b.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>{b.label}</div>
              {b.items.map(item => (
                <div key={item} style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.6, display: 'flex', gap: 6, marginBottom: 4 }}>
                  <span style={{ color: b.color, flexShrink: 0 }}>·</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>

        <Callout type="info">
          <strong>Why this matters on the exam:</strong> A question describing "the system must do X, Y, and Z" is often trying to get you to over-architect. Split X/Y/Z into the three buckets — sometimes only one of them needs Claude at all.
        </Callout>
      </Section>

      <Section title="The Input → Processing → Output → Feedback Loop">
        <P>Every Claude system — regardless of pattern — has this four-stage loop. The exam sometimes tests whether you understand where a failure lives by naming which stage broke.</P>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, margin: '16px 0', flexWrap: 'wrap' }}>
          {[
            { stage: 'Input', desc: 'User message, retrieved context, tool results, conversation history', color: '#818CF8' },
            { stage: 'Processing', desc: 'Model reasoning, tool calls, intermediate steps', color: '#34D399' },
            { stage: 'Output', desc: 'Final response, structured data, tool invocations', color: '#FBBF24' },
            { stage: 'Feedback', desc: 'Evals, user signals, monitoring — feeds back into input/system prompt improvements', color: '#F87171' },
          ].map((s, i) => (
            <div key={s.stage} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 160 }}>
              <div style={{ flex: 1, padding: '14px 12px', borderRadius: 8, background: 'var(--surface)', border: `1px solid ${s.color}`, textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.stage}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
              {i < 3 && <div style={{ fontSize: '1.2rem', color: 'var(--faint)', padding: '0 6px', flexShrink: 0 }}>→</div>}
            </div>
          ))}
        </div>
        <Callout type="warn">
          <strong>Feedback is the most skipped stage.</strong> Systems that never loop eval results back into prompt/system improvements degrade silently as data distributions shift.
        </Callout>
      </Section>
    </div>
  );
}

function TabSelection() {
  return (
    <div>
      <Section title="5-Factor Pattern Selection — Walk in Sequence">
        <P>These five factors are evaluated in order. The <strong>first factor that rules out a pattern</strong> is the deciding factor — you don't average them or weigh them equally. Tightest constraint wins.</P>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '16px 0' }}>
          {[
            { n: '1', factor: 'Predictability', question: 'Can you define all the steps before execution?', rules: 'Yes → prefer workflow. No → consider agent.' },
            { n: '2', factor: 'Error cost', question: 'What happens if the system makes a wrong decision?', rules: 'High / irreversible → tighter control (workflow, HITL). Low → more autonomy acceptable.' },
            { n: '3', factor: 'Observability', question: 'Does every step need to be logged, audited, or reproducible?', rules: 'Yes → fixed workflow. No → agent acceptable.' },
            { n: '4', factor: 'Latency budget', question: 'How fast must the system respond?', rules: 'Tight SLA → parallelise or simplify. Loose → sequential agentic loops OK.' },
            { n: '5', factor: 'Cost', question: 'What is the token/compute budget?', rules: 'Tight → right-size model, progressive context, caching. Loose → more flexibility.' },
          ].map(f => (
            <div key={f.n} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10 }}>
              <div style={{ minWidth: 28, height: 28, borderRadius: 6, background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>{f.n}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', marginBottom: 4 }}>{f.factor}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 6 }}>{f.question}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{f.rules}</div>
              </div>
            </div>
          ))}
        </div>

        <Callout type="info">
          <strong>Exam application:</strong> Read the scenario, identify which factor is the binding constraint (usually explicitly stated — "must be auditable", "strict SLA", "wrong decision is irreversible"), then eliminate patterns that fail that factor first.
        </Callout>
      </Section>

      <Section title="The 5 Reference Architectures">
        <P>These are tested design templates. When a question describes a familiar problem shape, reach for the named reference architecture rather than designing from scratch.</P>
        <Table
          headers={['Reference architecture', 'When to use', 'Key design rule']}
          rows={[
            ['Agent', 'Path only clear at runtime; must self-recover', 'Bound it: constrained tools, per-turn budgets, explicit stopping criteria'],
            ['RAG', 'Need to ground responses in external knowledge', 'Structure-aware chunking; retrieval ≠ live state'],
            ['Document-processing pipeline', 'Extract / classify / validate at scale', 'Evaluator-optimizer loop; split large tasks into scoped calls'],
            ['Routing', 'One entry point, many specialised downstream handlers', 'Classifier first; handlers are independent'],
            ['Coding agent', 'Agentic code generation / review', 'Trace-first debugging; shared versioned standards; human holds merge authority'],
          ]}
        />
        <Callout type="danger">
          <strong>#1 mistake with reference architectures:</strong> Using retrieval as a substitute for live state. Retrieval = static/stale snapshots. Live state (account balance, inventory, permissions) needs a direct tool lookup — never a RAG call.
        </Callout>
      </Section>
    </div>
  );
}

function TabWorkflow() {
  return (
    <div>
      <Section title="The 4 Workflow Sub-Patterns">
        <P>Fixed workflows are composed of these four sub-patterns. A single workflow can combine multiple. Know each pattern's shape and when it appears on the exam.</P>

        {[
          {
            name: 'Chaining',
            color: '#818CF8',
            desc: 'Each step consumes the previous step\'s output. Linear, sequential, auditable.',
            when: 'Multi-stage transformation where each step builds on the last.',
            example: 'Extract → Classify → Summarise → Format',
            trap: 'Don\'t confuse chaining with an autonomous agent. Chaining has fixed, known steps. An agent decides what to do next at runtime.',
          },
          {
            name: 'Routing',
            color: '#34D399',
            desc: 'A classifier step picks which downstream handler processes the input. One entry, many paths.',
            when: 'Different input types need different processing logic.',
            example: 'Support ticket → classify (billing / technical / sensitive) → route to handler',
            trap: 'The classifier is usually a lightweight model call (Haiku). Don\'t over-engineer the routing step itself.',
          },
          {
            name: 'Parallelization',
            color: '#FBBF24',
            desc: 'Independent subtasks run concurrently. Results are aggregated or voted on at the end.',
            when: 'Multiple independent transformations that don\'t depend on each other\'s results.',
            example: 'Analyse 5 documents simultaneously, then merge findings',
            trap: 'Only use when subtasks are truly independent. A dependency between steps means chaining, not parallelization.',
          },
          {
            name: 'Evaluator-Optimizer',
            color: '#F87171',
            desc: 'Generate → Judge → Revise loop. Continues until quality threshold met or retry limit hit.',
            when: 'Quality requirements are high and the output can be objectively evaluated.',
            example: 'Generate code → run tests → if tests fail, revise → repeat (max N times)',
            trap: 'Must have a retry limit. An uncapped loop becomes an infinite loop on hard problems.',
          },
        ].map(p => (
          <div key={p.name} style={{ padding: '18px 20px', borderRadius: 10, background: 'var(--surface)', border: `1px solid var(--line)`, borderLeft: `4px solid ${p.color}`, marginBottom: 14 }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: p.color, marginBottom: 8 }}>{p.name}</div>
            <P>{p.desc}</P>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', minWidth: 70, textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: 2 }}>Use when</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{p.when}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', minWidth: 70, textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: 2 }}>Example</span>
                <span style={{ fontSize: '0.82rem', color: p.color, fontStyle: 'italic', lineHeight: 1.55 }}>{p.example}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FBBF24', minWidth: 70, textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: 2 }}>⚠ Trap</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{p.trap}</span>
              </div>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

function TabPrimitives() {
  return (
    <div>
      <Section title="The 7 Primitives — Building Blocks of Every Architecture">
        <P>Patterns are assemblies of these primitives. Know the one-word job for each — the exam tests whether you can identify which primitive solves which problem.</P>
        <P><strong>Rule:</strong> Use the fewest primitives that meet the requirement. Each one adds cost, complexity, and a new failure mode.</P>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '16px 0' }}>
          {[
            { name: 'Tools', job: 'Act', color: '#818CF8', desc: 'A function the model can call to take an action or fetch a result. Tools are the only way for the model to interact with external systems.', exam: 'If the question involves the model doing something in an external system, it needs a tool.' },
            { name: 'MCP', job: 'Connect', color: '#A78BFA', desc: 'Protocol exposing tools so many Claude clients can share entry points. Tools become discoverable without each client reimplementing the integration.', exam: '"Multiple teams / reusable across consumers / discoverable" → MCP. "One pipeline you own" → direct API call.' },
            { name: 'Subagents', job: 'Isolate', color: '#34D399', desc: 'A scoped sub-task handed to a separate context. Each subagent has its own context window and tool access. Vanishes when its task completes — results pass back to the orchestrator.', exam: 'Context isolation + parallel execution. Not for tasks that need shared memory with the parent.' },
            { name: 'Hooks', job: 'Guarantee', color: '#FBBF24', desc: 'Deterministic code that fires on events (PreToolUse, PostToolUse, Stop). Enforces a rule the model cannot skip — the code always runs, regardless of model output.', exam: 'Any rule that must be right 100% of the time → hook, not prompt. "Block X before the tool runs" → PreToolUse hook.' },
            { name: 'Skills', job: 'Package', color: '#F87171', desc: 'A versioned, reusable unit of instructions (+ optional scripts). Choose a Skill when the procedure repeats, needs distribution, or must be versioned and governed.', exam: '"Standardise across teams / version-controlled workflow / reusable procedure" → Skill.' },
            { name: 'Agent Teams', job: 'Coordinate', color: '#60A5FA', desc: 'Multiple agents as peers, each owning part of a goal. No single orchestrator — coordination is emergent. Each agent has distinct role, tools, and context.', exam: '"Parallel specialists, no strict ordering" → Agent Teams. "Strict ordering + halt on failure" → supervisor pattern.' },
            { name: 'Dynamic Workflows', job: 'Compose', color: '#6EE7B7', desc: 'Workflow steps assembled at runtime based on what the agent discovers. Not a fixed sequence decided in advance.', exam: '"Tasks that adapt as new information is discovered" → Dynamic Workflow. "Known identical steps" → Fixed Workflow.' },
          ].map(p => (
            <div key={p.name} style={{ display: 'flex', gap: 14, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0, minWidth: 70 }}>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: p.color }}>{p.name}</div>
                <div style={{ fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44`, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p.job}</div>
              </div>
              <div style={{ borderLeft: `2px solid ${p.color}44`, paddingLeft: 14, flex: 1 }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 8 }}>{p.desc}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-text)', background: 'var(--accent-dim)', padding: '5px 10px', borderRadius: 6, lineHeight: 1.5 }}>
                  <strong>Exam:</strong> {p.exam}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function TabOrch() {
  return (
    <div>
      <Section title="Orchestration: Supervisor vs Peer-to-Peer">
        <Table
          headers={['', 'Supervisor (coordinator-worker)', 'Peer-to-peer (agent teams)']}
          rows={[
            ['Ordering', 'Guaranteed — coordinator controls sequence', 'Emergent — agents coordinate themselves'],
            ['Failure handling', 'Halt on exception — coordinator decides what to do', 'Continues unless explicitly stopped'],
            ['Audit / reproducibility', 'High — coordinator tracks all steps', 'Low — hard to reconstruct exact execution order'],
            ['Pick when', 'Strict ordering required · audit needed · halt-on-failure is the right policy', 'Parallel exploration · no strict dependencies · emergent coordination OK'],
            ['Typical shape', 'One orchestrator → many specialised workers → results back to orchestrator', 'Multiple peers, each handling their domain, sharing results laterally'],
          ]}
        />

        <Callout type="info">
          <strong>Exam signal for supervisor:</strong> "guaranteed ordering", "halt if any step fails", "coordinator visibility". <br />
          <strong>Exam signal for peer-to-peer:</strong> "parallel", "independent specialists", "emergent", "no strict dependency".
        </Callout>
      </Section>

      <Section title="Production Agent Constraints — Non-Negotiable">
        <P>Any autonomous agent deployed in production must be bounded. The exam treats unbounded agents as a design defect.</P>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '12px 0' }}>
          {[
            ['Constrained tool entry points', 'Only expose the tools the agent actually needs — nothing more'],
            ['Per-turn token budgets', 'Cap context accumulation per turn to prevent runaway cost'],
            ['Explicit permissions', 'Each tool call is authorized against defined rules — not inferred from context'],
            ['Stopping criteria', 'The agent knows when it\'s done. No open-ended loops in production.'],
            ['Human approval gates', 'Irreversible or high-impact actions require explicit human sign-off before execution'],
          ].map(([rule, why]) => (
            <div key={rule} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', minWidth: 200, flexShrink: 0 }}>{rule}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{why}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function TabModel() {
  return (
    <div>
      <Section title="Model Selection Strategy">
        <P>The exam tests whether you know to right-size the model to the task — not always reach for the most capable model.</P>
        <Table
          headers={['Model tier', 'Use for', 'Don\'t use for']}
          rows={[
            ['Haiku (fast / cheap)', 'Classification, routing, simple extraction, high-volume low-stakes tasks', 'Complex reasoning, ambiguous judgment, multi-step planning'],
            ['Sonnet (default)', 'Most production tasks — start here. Strong reasoning at reasonable cost.', 'Ultra-low latency or ultra-high volume where Haiku suffices'],
            ['Opus (powerful)', 'Complex reasoning, high-stakes judgment, novel problems requiring deep analysis', 'Routine tasks — cost and latency are 5–10× higher'],
          ]}
        />
        <Callout type="info">
          <strong>Exam rule:</strong> Start with Sonnet. Any swap to Opus or Haiku is a <strong>release</strong> — set an eval set and a rollback criterion before the swap. Never upgrade the model as the first fix for a quality problem.
        </Callout>
        <Callout type="warn">
          <strong>Reliability fix order:</strong> Prompt → tool/retrieval → stronger pattern → fine-tune.<br />
          Fine-tune is last resort: very-high-volume + cost-critical + small model + format that prompting can't hit. Not broadly available, not a default fix.
        </Callout>
      </Section>

      <Section title="Context Strategy: Progressive vs Monolithic">
        <Table
          headers={['', 'Progressive context', 'Monolithic context']}
          rows={[
            ['How it works', 'Load context per step as the agent needs it', 'Load everything upfront at the start'],
            ['Performance on long tasks', 'Stays fast — only relevant context per step', 'Degrades — window fills up, attention diffuses'],
            ['Cost', 'Lower — only pay for what each step needs', 'Higher — redundant tokens on every turn'],
            ['When to use', 'Long-horizon tasks, multi-step workflows, large document sets', 'Short tasks where all context fits comfortably and is needed immediately'],
          ]}
        />
        <Callout type="danger">
          <strong>Exam pattern:</strong> "Agent performance degrades mid-task / quality drops as the task gets longer / context fills up" → switch from monolithic to progressive context loading.
        </Callout>
      </Section>

      <Section title="Cost Reality: Agents vs Workflows">
        <P>A common misconception is that agents automatically cost more than workflows. This is false — the actual cost drivers are:</P>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '12px 0' }}>
          {[
            ['Context accumulation', 'Each turn carries the full conversation history. Long agents accumulate massive context quickly.'],
            ['Number of model calls', 'Every tool call = a round trip. Parallelising calls reduces wall time but not token cost.'],
            ['Model tier', 'Opus at 10 calls costs the same as Sonnet at ~50 calls. Right-size first.'],
          ].map(([driver, desc]) => (
            <div key={driver} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', minWidth: 200, flexShrink: 0 }}>{driver}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{desc}</span>
            </div>
          ))}
        </div>
        <Callout type="info">Design decisions drive cost — not whether you call the system an "agent" or a "workflow."</Callout>
      </Section>
    </div>
  );
}

function TabTells() {
  return (
    <div>
      <Section title="Signal Phrases → Pattern (D1 specific)">
        <Table
          headers={['If the question says…', 'The answer is…']}
          rows={[
            ['"steps are the same every time / known in advance"', 'Fixed workflow'],
            ['"only becomes clear mid-task / at runtime"', 'Autonomous agent'],
            ['"recover on its own / self-recovery"', 'Autonomous agent'],
            ['"different specialists / tools / context per subtask"', 'Multi-agent'],
            ['"run in parallel / concurrent subtasks"', 'Multi-agent (or parallelization sub-pattern)'],
            ['"using the retrieved / supplied / provided context"', 'Single augmented call — not a workflow'],
            ['"steps known in advance + must be auditable"', 'Fixed workflow'],
            ['"adapt as new information is discovered"', 'Dynamic workflow or autonomous agent'],
            ['"guaranteed ordering + halt on failure"', 'Supervisor orchestration'],
            ['"performance degrades mid-task / context fills up"', 'Monolithic → progressive context loading'],
          ]}
        />
      </Section>

      <Section title="Distractor Red Flags in D1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Use a more capable model to fix quality', 'Wrong — fix order is: prompt → tool/retrieval → pattern → fine-tune. Model upgrade is never first.'],
            ['Add more tools to improve reliability', 'Wrong — more tools = more decision complexity + blast radius. Cut, don\'t add.'],
            ['Use multi-agent because the task is complex', 'Wrong — complexity alone doesn\'t justify multi-agent. Need distinct specialisations or parallel independence.'],
            ['Add retrieval to a single call = workflow', 'Wrong — context ≠ workflow. One transform with retrieval is still a single augmented call.'],
            ['Use an agent because steps might change', 'Wrong — "might change" is not the same as "only clear at runtime". Prefer workflow unless you can\'t know the steps.'],
          ].map(([distractor, why]) => (
            <div key={distractor} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)', borderLeft: '3px solid #F87171', borderRadius: 8 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', minWidth: 240, flexShrink: 0 }}>{distractor}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{why}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Correct-Answer Tells in D1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Simplest pattern that meets the constraint — never over-engineer.',
            'Diagnose first (trace, analyze) — don\'t jump straight to a fix.',
            'Tightest constraint decides the pattern — first factor that rules an option out wins.',
            'Decompose first (Claude / systems / humans buckets) before picking the architecture.',
            'Deterministic rules → deterministic code (tool/hook), never the prompt.',
            'Fewest primitives — each one adds cost, complexity, and failure modes.',
            'Context accumulation + model calls drive agent cost — not the "agent" label.',
          ].map((tell, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'var(--raised)', borderLeft: '3px solid var(--accent)', borderRadius: 8 }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{tell}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

const TAB_CONTENT = {
  intro:      <TabIntro />,
  patterns:   <TabPatterns />,
  decompose:  <TabDecompose />,
  selection:  <TabSelection />,
  workflow:   <TabWorkflow />,
  primitives: <TabPrimitives />,
  orch:       <TabOrch />,
  model:      <TabModel />,
  tells:      <TabTells />,
};

export default function CcapD1() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="page">
      <div className="page-hero" style={{ paddingBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="section-badge">D1</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>17% · 11 questions</span>
        </div>
        <h1 className="page-title">Solution Design & Architecture</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: 6, maxWidth: 540 }}>
          Match the right pattern to the problem. Reject over-engineering. Tightest constraint decides.
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginTop: 20, borderBottom: '1px solid var(--line)', overflowX: 'auto' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '8px 14px', background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: '0.78rem', fontWeight: activeTab === t.id ? 700 : 500,
                color: activeTab === t.id ? 'var(--accent)' : 'var(--muted)',
                borderBottom: `2px solid ${activeTab === t.id ? 'var(--accent)' : 'transparent'}`,
                marginBottom: -1, whiteSpace: 'nowrap', fontFamily: 'inherit',
                transition: 'color 0.12s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="page-body">
        {TAB_CONTENT[activeTab]}
      </div>
    </div>
  );
}
