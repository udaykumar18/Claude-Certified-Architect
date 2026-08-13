import { useState } from 'react';

const SECTIONS = [
  {
    num: '1',
    title: 'The 7 Domains',
    content: () => (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
          <thead>
            <tr>
              {['#', 'Domain (weight)', 'Must-know', 'Signature question pattern'].map(h => (
                <th key={h} style={{ padding: '9px 12px', textAlign: 'left', background: 'var(--raised)', borderBottom: '1px solid var(--line)', color: 'var(--ink-2)', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['1', 'Solution Design & Architecture (17%)', 'The 4 patterns (single augmented call / fixed workflow / autonomous agent / multi-agent); orchestration (supervisor vs peer-to-peer); task decomposition; input→processing→output→feedback loop; business-value pillars.', '"Which pattern/architecture fits?" Match the pattern to the task shape; reject over-engineering.'],
              ['2', 'Models, Prompting & Context (13%)', 'Right-size the model to the task; system prompts + guardrails; zero-/few-shot, chain-of-thought (selective); context-window & token optimization; reuse via prompt caching, modular prompts, Skills.', '"Output is close but inconsistent / cost too high / rule ignored." Fix with examples, structure, caching, or retrieval — not bigger model.'],
              ['3', 'Integration (19% — largest)', 'Capability/tool bloat; authz at the system layer (not the prompt); accuracy-vs-latency trade-offs; observability at scale; RAG chunking/indexing; MCP vs API/CLI vs agent-to-agent; progressive discovery vs monolithic context.', '"Connect / scale / secure / retrieve." Pick the mechanism that fits ownership + trust boundary; reduce surface.'],
              ['4', 'Evaluation, Testing & Optimization (16%)', 'Task-specific metrics tied to business outcomes; mixed-method eval datasets; LLM-as-judge w/ human calibration; A/B before full rollout; diagnose prompt-failure vs hallucination vs model-mismatch; leading vs lagging signals.', '"Is it good enough? / quality dropped / cut cost." Measure first, roll out gradually, optimize from evidence.'],
              ['5', 'Governance, Safety & Risk (14%)', 'Preventative guardrails; HITL at irreversible/high-impact actions; GDPR / HIPAA / FedRAMP; data minimization; bias via proxy variables; transparency/disclosure; retrieved content = untrusted data.', '"Ensure X never happens / compliance / fairness." Layer controls; place the gate where the risk is.'],
              ['6', 'Stakeholder Communication & Lifecycle (14%)', 'Structured discovery before building; convert absolutes into measurable criteria; evidence-based trade-off communication; SLA negotiation; handoff artifacts (decision records, runbooks, eval baselines); lifecycle phases.', '"Stakeholder wants X / handoff / reporting." Discover first, quantify, let the accountable owner decide.'],
              ['7', 'Developer Productivity & Enablement (7%)', 'Shared version-controlled config/standards (Claude Code); independent review with humans holding merge authority; diagnose via traces before changing anything; execution constraints.', '"Scale AI-assisted dev / agent misbehaving." Shared standards + guardrails; inspect before you fix.'],
            ].map(([n, d, mk, sq]) => (
              <tr key={n} style={{ borderBottom: '1px solid var(--line-sm)' }}>
                {[n, d, mk, sq].map((cell, i) => (
                  <td key={i} style={{ padding: '10px 12px', color: i === 1 ? 'var(--accent-text)' : 'var(--ink-2)', fontWeight: i === 1 ? 600 : 400, verticalAlign: 'top', lineHeight: 1.55 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    num: '2',
    title: 'Quick-Reference Vocab',
    content: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          {
            label: '4 Architecture Patterns',
            items: [
              ['Single augmented LLM call', 'One input→one output transformation, even with retrieval/glossary/context supplied. Context ≠ workflow.'],
              ['Fixed workflow', 'Steps known, identical every run, need auditability/reproducibility.'],
              ['Autonomous agent', 'Path/next-step only clear at runtime; needs self-recovery.'],
              ['Multi-agent', 'Distinct specialisations/tools/context per subtask, or parallelisable subtasks. Supervisor = guaranteed ordering + halt-on-exception; peer-to-peer = emergent.'],
            ],
          },
          {
            label: 'Lifecycle Phases',
            items: [
              ['Discovery', 'Problem, users, success definition, data landscape'],
              ['Design', 'Architecture, retrieval, guardrails'],
              ['Handoff', 'Runbooks, decision records, ownership'],
              ['Monitoring & iteration', 'Production evidence → next improvements'],
            ],
          },
          {
            label: 'Control Types',
            items: [
              ['Preventative guardrail', 'Block before output'],
              ['Human-in-the-loop', 'Per-decision judgment on high-impact/irreversible acts'],
              ['Monitoring & audit', 'Reconstruction + trend detection, after the fact'],
            ],
          },
          {
            label: 'Retrieval Types',
            items: [
              ['Semantic', 'Natural language queries'],
              ['Keyword/exact', 'Identifiers, SKUs, part numbers'],
              ['Hybrid', 'Mix weighted by query type — use when exact identifiers fail'],
            ],
          },
          {
            label: 'Integration Mechanisms',
            items: [
              ['MCP', 'Many systems × many reusable/discoverable consumers, decentralized ownership'],
              ['API/CLI', 'Deterministic, tightly-scoped call inside an owned pipeline'],
              ['Agent-to-agent', 'Coordination across org trust boundary without exposing internals'],
            ],
          },
          {
            label: 'Prompt Caching',
            items: [
              ['Key rule', 'Matches on a stable prefix. Put static content first, dynamic (timestamp, IDs, user msg) last.'],
              ['Failure mode', 'Any dynamic value at position 0 → ~0% hit rate'],
            ],
          },
          {
            label: 'Issue Triage',
            items: [
              ['Prompt failure', 'Conflicting/ambiguous instructions'],
              ['Hallucination', 'Confident fabrication ungrounded in source/tool output'],
              ['Model mismatch', 'Capability gap between chosen model and task'],
            ],
          },
        ].map(({ label, items }) => (
          <div key={label}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {items.map(([term, def]) => (
                <div key={term} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: 'var(--raised)', borderRadius: 6, border: '1px solid var(--line)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--ink)', minWidth: 160, flexShrink: 0, fontSize: '0.82rem' }}>{term}</span>
                  <span style={{ color: 'var(--ink-2)', fontSize: '0.82rem', lineHeight: 1.5 }}>{def}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '3',
    title: 'Architecture Building Blocks',
    content: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>The 7 Primitives</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 10 }}>Patterns are assemblies of these — use the fewest that meet the requirement.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  {['Primitive', 'Job', 'What it is'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', background: 'var(--raised)', borderBottom: '1px solid var(--line)', color: 'var(--ink-2)', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Tools', 'Act', 'A function the model can call to take an action / fetch a result'],
                  ['MCP', 'Connect', 'Protocol exposing tools so many Claude clients share entry points'],
                  ['Subagents', 'Isolate / parallelize', 'Scoped sub-task handed to a separate context'],
                  ['Hooks', 'Guarantee', 'Deterministic code firing on events — enforces a rule the model can\'t skip'],
                  ['Skills', 'Package a procedure', 'Versioned, reusable unit (instructions + optional scripts)'],
                  ['Agent Teams', 'Coordinate peers', 'Multiple agents as peers, each owning part of a goal'],
                  ['Dynamic Workflows', 'Compose at runtime', 'Assemble workflow steps at runtime, not fixed in advance'],
                ].map(([p, j, w]) => (
                  <tr key={p} style={{ borderBottom: '1px solid var(--line-sm)' }}>
                    <td style={{ padding: '9px 12px', fontWeight: 700, color: 'var(--accent-text)' }}>{p}</td>
                    <td style={{ padding: '9px 12px', color: 'var(--ink)', fontWeight: 600 }}>{j}</td>
                    <td style={{ padding: '9px 12px', color: 'var(--ink-2)', lineHeight: 1.5 }}>{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {[
          {
            label: '4 Workflow Sub-Patterns',
            items: [
              ['Chaining', 'Step 2 consumes step 1 (extract→classify→summarize)'],
              ['Routing', 'A classifier picks the downstream path (one entry, many handlers)'],
              ['Parallelization', 'Independent calls run concurrently, results aggregated/voted'],
              ['Evaluator-optimizer', 'Generate → judge → revise loop until quality met / retry limit'],
            ],
          },
          {
            label: '5 Reference Architectures',
            items: [
              ['Agent', 'Model owns trajectory; bounded tool entry points, per-turn budgets'],
              ['RAG', 'Retrieval-augmented generation; structure-aware chunking, not fixed size'],
              ['Document-processing pipeline', 'Evaluator-optimizer pattern; generate → judge → revise'],
              ['Routing', 'Classifier selects handler; one entry, many specialized paths'],
              ['Coding agent', 'Trace-first debugging; shared versioned standards'],
            ],
          },
        ].map(({ label, items }) => (
          <div key={label}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {items.map(([term, def]) => (
                <div key={term} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: 'var(--raised)', borderRadius: 6, border: '1px solid var(--line)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--ink)', minWidth: 180, flexShrink: 0, fontSize: '0.82rem' }}>{term}</span>
                  <span style={{ color: 'var(--ink-2)', fontSize: '0.82rem', lineHeight: 1.5 }}>{def}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ padding: '12px 16px', background: 'var(--accent-dim)', border: '1px solid var(--accent)', borderRadius: 8, fontSize: '0.82rem', color: 'var(--accent-text)' }}>
          <strong>Deterministic-rule trap:</strong> A rule that must be right every time belongs in deterministic code (tool/hook/SQL), never folded into the prompt. The model is right most of the time — model-internal choices aren't logged, so drift stays invisible until an audit.
        </div>
      </div>
    ),
  },
  {
    num: '4',
    title: 'Evals & Quality Gates',
    content: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          ['Evals before code', 'Write the suite first: forces measurable success, exposes assumptions early, gives a change-gate. "If you can\'t write an eval for it, you can\'t measure it."'],
          ['5-stage workflow', 'Define task (spec + prompt + pass criteria) → build golden dataset (incl. edge/adversarial) → automated checks → judge-scored → interpret & act.'],
          ['Grading ladder', 'Cheapest reliable first: code → LLM-judge → human. Climb only when the behavior demands it.'],
          ['LLM-as-judge rigor', 'Detailed rubric · constrained verdicts (fixed labels) · calibrate vs human labels · use a different model as judge (avoid self-preference). Uncalibrated judge is worse than none.'],
          ['Volume over perfection', 'Many cheap auto-graded cases beat a handful of hand-graded ones.'],
          ['Multi-turn evals', 'Own golden dataset of full transcripts; checks context retention, no invented details, quality-over-length.'],
          ['Stale eval = false confidence', 'Highest-risk moment. Run evals before every change.'],
        ].map(([term, def]) => (
          <div key={term} style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8 }}>
            <div style={{ fontWeight: 700, fontSize: '0.83rem', color: 'var(--ink)', marginBottom: 4 }}>{term}</div>
            <div style={{ fontSize: '0.81rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{def}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '5',
    title: 'Production, Governance & Lifecycle',
    content: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          {
            label: 'Safety = layered stack, not a setting',
            items: [
              ['3 control points', 'Input screening · output screening · tool-call authorization. An end-filter alone doesn\'t cover the other two.'],
              ['Fail closed', 'Where a wrong pass causes harm, blocking-on-uncertainty beats letting it through.'],
              ['Authz lives in system layer', 'Prompts are not a boundary; retrieved content is untrusted data; least-privilege tooling caps blast radius.'],
            ],
          },
          {
            label: 'Lifecycle',
            items: [
              ['Discovery', 'Translate each preference into a constraint. A useful requirement is testable + bounded.'],
              ['Tradeoff framing', 'Present 3 elements: gains · gives up · cost of reversal (the missing one that moves the meeting).'],
              ['Feedback loop', 'Governance table: signal → trigger → owner → action. Regulated reviews fire on a schedule, wired before launch.'],
              ['Handoff completeness', 'Can an Architect who wasn\'t in the room make a safe change? Record decisions + rejected alternatives + tradeoff each resolved.'],
            ],
          },
          {
            label: 'Compliance',
            items: [
              ['GDPR', 'EU personal data, minimization'],
              ['HIPAA', 'US health/PHI'],
              ['FedRAMP', 'US federal cloud authorization'],
              ['Principle', 'Resolve the whole data path at architecture stage, before data flows.'],
            ],
          },
          {
            label: 'Team Enablement',
            items: [
              ['Skills distribution', 'Org-provisioned (all) · plugins (group/org, versioned + rollback) · project Skills (one team) · API Skills (programmatic)'],
              ['AI-code diligence', 'Correctness + security + maintainability; author can explain what shipped; checklist gates before prod.'],
              ['Config rule', 'CLAUDE.md = instructions; settings/permissions/hooks = enforceable.'],
            ],
          },
        ].map(({ label, items }) => (
          <div key={label}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {items.map(([term, def]) => (
                <div key={term} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: 'var(--raised)', borderRadius: 6, border: '1px solid var(--line)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--ink)', minWidth: 160, flexShrink: 0, fontSize: '0.82rem' }}>{term}</span>
                  <span style={{ color: 'var(--ink-2)', fontSize: '0.82rem', lineHeight: 1.5 }}>{def}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '6',
    title: 'Correct-Answer "Tells"',
    content: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          ['Diagnose before acting', '"Inspect traces / analyze / evaluate first" beats jumping to a fix.'],
          ['Structure over brute force', 'Decompose, structure-aware chunk, retrieve-only-relevant, progressive discovery — beats "bigger model / more tokens / more chunks / bigger context."'],
          ['Least privilege — remove, don\'t monitor', 'Cut unneeded tools/permissions entirely; logging/confirmations are compensating controls, not the fix.'],
          ['Security lives in the system layer', 'Prompts are not a boundary; retrieved content is untrusted data; least-privilege tooling caps blast radius.'],
          ['Layer controls at the risk', 'Guardrail + human review; HITL only at irreversible/high-impact steps.'],
          ['Tie to measurable business outcomes', 'Use-case selection, "good enough," and reporting all resolve to defined, measurable criteria.'],
          ['Both/and', 'Hybrid retrieval, golden data + adversarial cases, guardrail + human approval.'],
          ['Match pattern to problem', 'Simplest sufficient design; don\'t buy autonomy/agents you don\'t need.'],
          ['Deterministic rule → deterministic code', 'A must-be-right-every-time rule goes in a tool/hook/SQL, never the prompt.'],
          ['Tightest constraint decides the pattern', 'First of {predictability, error cost, observability, latency, cost} that rules an option out is the deciding factor.'],
          ['Reversal cost is the winning tradeoff element', 'The option that names what undoing it costs usually beats ones that only list gains/losses.'],
          ['Fail closed', 'On a control where a wrong pass causes harm, blocking-on-uncertainty beats letting it through.'],
        ].map(([tell, why]) => (
          <div key={tell} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'var(--raised)', borderRadius: 8, border: '1px solid var(--line)', borderLeft: '3px solid var(--accent)' }}>
            <span style={{ fontWeight: 700, color: 'var(--ink)', minWidth: 220, flexShrink: 0, fontSize: '0.82rem' }}>{tell}</span>
            <span style={{ color: 'var(--ink-2)', fontSize: '0.82rem', lineHeight: 1.55 }}>{why}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '7',
    title: 'How to Read the Question',
    content: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Signal Phrases → Answer</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  {['Phrase in stem', 'Points to'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', background: 'var(--raised)', borderBottom: '1px solid var(--line)', color: 'var(--ink-2)', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['"steps are the same every time / known in advance"', 'Fixed workflow'],
                  ['"only becomes clear mid-task / at runtime", "recover on its own"', 'Autonomous agent'],
                  ['"different specialists / tools / context", "run in parallel"', 'Multi-agent'],
                  ['One transform + "using the retrieved / supplied context"', 'Single augmented call'],
                  ['Concrete numbers (p95, SLA, %, ms) given', 'Do the arithmetic vs threshold, then commit'],
                  ['"after a document refresh / re-index", "confident but wrong"', 'Retrieval / indexing, not the model'],
                  ['"define success / how measured", "understand current process"', 'Discovery phase'],
                  ['"runbooks / transfer ownership"', 'Handoff phase'],
                  ['"must never … before it\'s shown"', 'Preventative guardrail'],
                  ['Exact identifiers (SKU, part #) failing', 'Hybrid retrieval'],
                ].map(([phrase, points]) => (
                  <tr key={phrase} style={{ borderBottom: '1px solid var(--line-sm)' }}>
                    <td style={{ padding: '9px 12px', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.5 }}>{phrase}</td>
                    <td style={{ padding: '9px 12px', color: 'var(--accent-text)', fontWeight: 600 }}>{points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8, fontSize: '0.82rem' }}>
          <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Also parse:</div>
          <ul style={{ paddingLeft: '1.2em', display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--ink-2)', lineHeight: 1.6 }}>
            <li><strong>"Select N" / "choose TWO"</strong> — answer count is stated; missing one = whole item wrong (no partial credit).</li>
            <li><strong>Qualifiers</strong> — first, most directly, best, most likely — several may be "right"; only one is the best/first step. Underline these.</li>
            <li><strong>The real ask</strong> — separate the scenario noise from the one decision being tested. What actually changed? What is the root problem?</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    num: '8',
    title: 'How to Read the Answers',
    content: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ padding: '12px 16px', background: 'var(--raised)', border: '1px solid var(--line)', borderRadius: 8, fontSize: '0.82rem', color: 'var(--ink-2)' }}>
          Expect ≥2 plausible options — pick the one that fixes the <strong>root cause</strong> at the <strong>right layer</strong>.
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F87171', marginBottom: 8 }}>Distractor Red Flags — Usually Wrong</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              ['Absolutes', '"always / never / only / cannot"'],
              ['"Use the biggest / most capable / most sophisticated"', '—'],
              ['"Just make it bigger"', 'More tokens, tools, chunks, context, larger model, bigger window'],
              ['Compensating-control theater', 'Add logging/monitoring/confirmation instead of removing the risk'],
              ['Prompt-as-security', 'Telling the model to police itself for an authz/safety job'],
              ['Push the problem onto users', 'Or defer a decision the data already supports'],
              ['Hide impact', 'Absorb scope silently, cut testing to hit a date, comply without surfacing material info'],
            ].map(([flag, note]) => (
              <div key={flag} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: 'rgba(248,113,113,0.06)', borderRadius: 6, border: '1px solid rgba(248,113,113,0.2)', borderLeft: '3px solid #F87171' }}>
                <span style={{ fontWeight: 700, color: 'var(--ink)', minWidth: 200, flexShrink: 0, fontSize: '0.82rem' }}>{flag}</span>
                {note !== '—' && <span style={{ color: 'var(--ink-2)', fontSize: '0.82rem', lineHeight: 1.5 }}>{note}</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '12px 16px', background: 'var(--accent-dim)', border: '1px solid var(--accent)', borderRadius: 8, fontSize: '0.82rem', color: 'var(--accent-text)' }}>
          <strong>Elimination method:</strong> (1) Drop options with a red-flag phrase; (2) of what's left, pick the one matching a correct-answer "tell"; (3) if two remain, choose the one that diagnoses first, is measurable, or combines the partial truths.
        </div>
      </div>
    ),
  },
  {
    num: '9',
    title: 'Final-Hour Checklist',
    content: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          'Name all 4 architecture patterns from their signal phrases in <5 sec.',
          'Retrieval/context on one transform = single augmented call, not a workflow.',
          '"Emergent path / self-recovery" = agent; "known identical steps + audit" = workflow.',
          'Numbers in the stem → calculate against the threshold and commit.',
          'Bloat / overlap → reduce & clarify, never add.',
          'Security & authz → system layer, never the prompt; retrieved text is untrusted data.',
          'Read every qualifier (first / most / best) and every "select N" before answering.',
          'Name the 7 primitives + their one-word job (Tools=Act, MCP=Connect, Subagents=Isolate, Hooks=Guarantee, Skills=Package, Agent Teams=Coordinate, Dynamic Workflows=Compose).',
          'Name the 4 workflow sub-patterns (chaining / routing / parallelization / evaluator-optimizer).',
          'Deterministic rule → tool/hook, never the prompt; retrieval ≠ live state.',
          'Eval suite is written before code and re-run before every change; judge is calibrated + a different model.',
          'Tradeoffs name the reversal cost; controls fail closed; compliance = obligation→control→owner→evidence.',
        ].map((item, i) => (
          <label key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
            <input type="checkbox" style={{ marginTop: 3, accentColor: 'var(--accent)', width: 15, height: 15, flexShrink: 0 }} />
            <span style={{ fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{item}</span>
          </label>
        ))}
      </div>
    ),
  },
];

export default function CcapCheatsheet() {
  const [open, setOpen] = useState(new Set(['1']));

  const toggle = (num) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const expandAll = () => setOpen(new Set(SECTIONS.map(s => s.num)));
  const collapseAll = () => setOpen(new Set());

  return (
    <div className="page">
      <div className="page-hero" style={{ paddingBottom: 20 }}>
        <span className="section-badge">CCA-P</span>
        <h1 className="page-title" style={{ marginTop: 8 }}>Cheatsheet</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: 6 }}>
          9 sections · Expand each to study · Sources: CCAR-P Exam Guide v1.0 + official practice questions
        </p>
      </div>

      <div className="page-body">
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button onClick={expandAll} style={{ padding: '5px 14px', borderRadius: 6, border: '1px solid var(--line)', background: 'var(--raised)', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit' }}>
            Expand all
          </button>
          <button onClick={collapseAll} style={{ padding: '5px 14px', borderRadius: 6, border: '1px solid var(--line)', background: 'var(--raised)', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit' }}>
            Collapse all
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SECTIONS.map((s) => {
            const isOpen = open.has(s.num);
            return (
              <div key={s.num} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                <button
                  onClick={() => toggle(s.num)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 20px', background: 'transparent', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                    borderBottom: isOpen ? '1px solid var(--line)' : 'none',
                  }}
                >
                  <span style={{
                    minWidth: 26, height: 26, borderRadius: 6, background: isOpen ? 'var(--accent)' : 'var(--raised)',
                    color: isOpen ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 800, flexShrink: 0, transition: 'all 0.15s',
                  }}>{s.num}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', flex: 1 }}>{s.title}</span>
                  <span style={{ color: 'var(--faint)', fontSize: '0.8rem', transition: 'transform 0.15s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '20px 20px 24px' }}>
                    {s.content()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
