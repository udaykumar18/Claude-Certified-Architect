function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: 'auto', margin: '12px 0', borderRadius: 8, border: '1px solid var(--line)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{ padding: '8px 14px', textAlign: 'left', background: 'var(--raised)', borderBottom: '1px solid var(--line)', color: 'var(--ink-2)', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--line-sm)' : 'none' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '9px 14px', color: j === 0 ? 'var(--ink)' : 'var(--ink-2)', fontWeight: j === 0 ? 600 : 400, verticalAlign: 'top', lineHeight: 1.55 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ children }) {
  return (
    <div style={{
      background: 'var(--accent-dim)', border: '1px solid var(--accent)',
      borderLeft: '3px solid var(--accent)', borderRadius: 8,
      padding: '10px 14px', fontSize: '0.82rem', color: 'var(--accent-text)',
      lineHeight: 1.65, margin: '12px 0',
    }}>
      {children}
    </div>
  );
}

function H2({ children }) {
  return <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)', margin: '28px 0 10px', paddingBottom: 7, borderBottom: '1px solid var(--line)' }}>{children}</h2>;
}

function P({ children }) {
  return <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 10, maxWidth: '72ch' }}>{children}</p>;
}

export default function CcapD1() {
  return (
    <div className="page">
      <div className="page-hero" style={{ paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="section-badge">D1</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>17% · 11 questions</span>
        </div>
        <h1 className="page-title">Solution Design & Architecture</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: 6 }}>
          Match the right pattern to the problem. Tightest constraint decides.
        </p>
      </div>

      <div className="page-body">
        <div className="content">

          <H2>1 · The 4 Architecture Patterns</H2>
          <P>Most tested concept in D1. The signal phrase in the question always points to the right pattern.</P>
          <Table
            headers={['Pattern', 'Pick when…', 'Signal phrase']}
            rows={[
              ['Single augmented LLM call', 'One input → one output, even if retrieval/context/glossary is supplied alongside it.', '"using the provided / retrieved context"'],
              ['Fixed workflow', 'Steps are known in advance, identical every run, need auditability.', '"same steps every time", "reproducible", "audit trail"'],
              ['Autonomous agent', 'Next step only clear at runtime; needs self-recovery.', '"only becomes clear mid-task", "recover on its own", "emergent path"'],
              ['Multi-agent', 'Distinct specialisations, tools, or context per subtask — or parallelisable work.', '"different specialists", "run in parallel", "separate tools per task"'],
            ]}
          />
          <Callout>
            <strong>Common trap:</strong> Adding retrieval to a single call does not make it a workflow. If it's still one transform — one model call producing one result — it's still a single augmented call. Context ≠ workflow.
          </Callout>

          <H2>2 · Decompose Before You Architect</H2>
          <P>Before picking a pattern, split the problem into 3 buckets. Then pick the simplest pattern that satisfies the requirement.</P>
          <Table
            headers={['Bucket', 'Owns']}
            rows={[
              ['Claude', 'Judgment calls, classification, generation, reasoning under ambiguity'],
              ['Existing systems', 'Database reads/writes, business rules, auth, deterministic calculations'],
              ['Humans', 'Irreversible high-impact decisions, policy exceptions, final approval on sensitive actions'],
            ]}
          />
          <Callout>Autonomy you don't need is cost and risk you don't need.</Callout>

          <H2>3 · The 5-Factor Pattern Selection</H2>
          <P>Walk in sequence. The <strong>first factor that rules out a pattern</strong> is the deciding factor — not a weighted average. Tightest constraint wins.</P>
          <Table
            headers={['#', 'Factor', 'Rules out']}
            rows={[
              ['1', 'Predictability', 'Can you define all steps before execution? No → consider agent.'],
              ['2', 'Error cost', 'Wrong decision irreversible or high-cost? → tighter control, HITL.'],
              ['3', 'Observability', 'Every step must be logged/auditable? → fixed workflow.'],
              ['4', 'Latency budget', 'Tight SLA? → parallelise or simplify.'],
              ['5', 'Cost', 'Tight budget? → right-size model, progressive context, caching.'],
            ]}
          />

          <H2>4 · The 4 Workflow Sub-Patterns</H2>
          <Table
            headers={['Sub-pattern', 'What it does', 'Example']}
            rows={[
              ['Chaining', 'Step 2 consumes step 1\'s output. Linear, sequential.', 'Extract → Classify → Summarise'],
              ['Routing', 'A classifier picks the downstream handler.', 'Support ticket → billing / technical / sensitive handler'],
              ['Parallelization', 'Independent calls run concurrently, results aggregated.', 'Analyse 5 documents simultaneously, then merge'],
              ['Evaluator-optimizer', 'Generate → judge → revise loop until quality met or retry limit hit.', 'Generate code → run tests → if fail, revise → repeat (max N)'],
            ]}
          />

          <H2>5 · The 7 Primitives</H2>
          <P>Patterns are assemblies of these. Know the one-word job for each. Use the fewest that meet the requirement.</P>
          <Table
            headers={['Primitive', 'Job', 'Pick when']}
            rows={[
              ['Tools', 'Act', 'Model needs to interact with an external system'],
              ['MCP', 'Connect', 'Multiple teams / reusable / discoverable tools across consumers'],
              ['Subagents', 'Isolate', 'Context isolation + parallel execution needed'],
              ['Hooks', 'Guarantee', 'A rule must be right 100% of the time — deterministic enforcement'],
              ['Skills', 'Package', 'Procedure repeats, needs versioning or distribution across teams'],
              ['Agent Teams', 'Coordinate', 'Parallel specialists, no strict ordering'],
              ['Dynamic Workflows', 'Compose', 'Workflow steps only known at runtime as agent discovers new info'],
            ]}
          />

          <H2>6 · Supervisor vs Peer-to-Peer Orchestration</H2>
          <Table
            headers={['', 'Supervisor', 'Peer-to-peer']}
            rows={[
              ['Ordering', 'Guaranteed', 'Emergent'],
              ['Failure handling', 'Halt on exception', 'Continues unless explicitly stopped'],
              ['Pick when', 'Strict ordering · audit required · halt-on-failure', 'Parallel exploration · no strict dependency'],
            ]}
          />

          <H2>7 · The Deterministic Rule Trap</H2>
          <P>Any rule that must be right <strong>every single time</strong> belongs in deterministic code — a tool, a hook, or SQL — never in the prompt. The model is right <em>most</em> of the time. Model-internal decisions aren't logged like a code check, so drift stays invisible until an audit catches it.</P>

          <H2>8 · Model & Context Strategy</H2>
          <Table
            headers={['Rule', 'Detail']}
            rows={[
              ['Start with Sonnet', 'Any swap to Opus or Haiku is a release — set eval set + rollback criterion before the swap.'],
              ['Reliability fix order', 'Prompt → tool/retrieval → stronger pattern → fine-tune. Fine-tune is last resort.'],
              ['Progressive > monolithic context', '"Agent performance degrades mid-task" → switch from monolithic to progressive context loading.'],
              ['What drives agent cost', 'Context accumulation + number of model calls — not whether you call it an "agent".'],
            ]}
          />

        </div>
      </div>
    </div>
  );
}
