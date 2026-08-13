export default function CcapOverview() {
  const domains = [
    { code: 'D1', label: 'Solution Design & Architecture',                pct: '17%', q: 11, desc: 'End-to-end production system design, architectural trade-offs, scalability, and resilience patterns.' },
    { code: 'D2', label: 'Claude Models, Prompting & Context Engineering', pct: '13%', q: 8,  desc: 'Model selection, advanced prompt engineering, context window management, caching strategies.' },
    { code: 'D3', label: 'Integration',                                    pct: '19%', q: 12, desc: 'API design, MCP servers, tool orchestration, third-party system integration, authentication.' },
    { code: 'D4', label: 'Evaluation, Testing & Optimisation',             pct: '16%', q: 10, desc: 'Eval frameworks, systematic quality measurement, regression testing, cost and latency optimisation.' },
    { code: 'D5', label: 'Governance, Safety & Risk Management',           pct: '14%', q: 9,  desc: 'Safety controls, compliance, data handling, risk frameworks, human oversight patterns.' },
    { code: 'D6', label: 'Stakeholder Communication & Lifecycle Mgmt',     pct: '14%', q: 9,  desc: 'Communicating architectural decisions, change management, deployment lifecycle, documentation.' },
    { code: 'D7', label: 'Developer Productivity & Operational Enablement', pct: '7%',  q: 4,  desc: 'Claude Code workflows, CI/CD integration, team tooling, operational runbooks.' },
  ];

  const domainColors = {
    D1: { bg: 'rgba(129,140,248,0.12)', border: '#818CF8', text: '#A5B4FC' },
    D2: { bg: 'rgba(167,139,250,0.12)', border: '#A78BFA', text: '#C4B5FD' },
    D3: { bg: 'rgba(52,211,153,0.10)',  border: '#34D399', text: '#6EE7B7' },
    D4: { bg: 'rgba(251,191,36,0.10)',  border: '#FBBF24', text: '#FDE68A' },
    D5: { bg: 'rgba(248,113,113,0.10)', border: '#F87171', text: '#FCA5A5' },
    D6: { bg: 'rgba(96,165,250,0.10)',  border: '#60A5FA', text: '#93C5FD' },
    D7: { bg: 'rgba(52,211,153,0.08)',  border: '#6EE7B7', text: '#A7F3D0' },
  };

  const gaps = [
    { label: 'Plan mode vs direct execution vs multi-phase workflow — selection criteria',       domain: 'D1' },
    { label: 'CLAUDE.md vs .claude/rules/ vs Skills vs hooks vs settings.json — which when',    domain: 'D7' },
    { label: 'Context window optimization: summarization, sliding windows, structured state',    domain: 'D2' },
    { label: 'Truncation fix = split API calls + merge results, not raise max_tokens',           domain: 'D4' },
    { label: 'Sync Messages API vs async Batch API — decision criteria',                         domain: 'D3' },
  ];

  return (
    <div className="page">
      <div className="page-hero" style={{ paddingBottom: 28 }}>
        <span className="section-badge">CCA-P</span>
        <h1 className="page-title" style={{ marginTop: 8 }}>
          Claude Certified Architect<br />
          <span className="hero-accent">Professional</span>
        </h1>
        <p style={{ marginTop: 10, color: 'var(--muted)', fontSize: '0.88rem', maxWidth: 520 }}>
          Advanced exam for senior system designers building production Claude applications.
        </p>
        <div className="exam-stats" style={{ marginTop: 20 }}>
          {[
            { label: 'Questions (MCQ)', value: '63' },
            { label: 'Minutes', value: '120' },
            { label: 'Passing score', value: '720/1000' },
            { label: 'Domains', value: '7' },
            { label: 'Exam cost', value: '$175' },
          ].map((s) => (
            <div key={s.label} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="page-body">
        {/* CCA-F gap carryover */}
        <div style={{ marginBottom: 36 }}>
          <div className="section-header">
            <span className="section-badge" style={{ background: 'rgba(248,113,113,0.15)', color: '#F87171', border: '1px solid rgba(248,113,113,0.3)' }}>
              From CCA-F Score Report
            </span>
            <h2 className="section-title" style={{ marginTop: 6 }}>Carry-Forward Gaps</h2>
            <p className="section-sub">Scored 0–50% on CCA-F — high overlap with Professional domains</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 760 }}>
            {gaps.map((g) => {
              const dc = domainColors[g.domain];
              return (
                <div key={g.label} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 16px', borderRadius: 8,
                  background: 'var(--surface)', border: '1px solid var(--line)',
                }}>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 700, padding: '2px 7px',
                    borderRadius: 4, border: `1px solid ${dc.border}`,
                    background: dc.bg, color: dc.text, flexShrink: 0,
                  }}>{g.domain}</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{g.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Domain breakdown */}
        <div>
          <div className="section-header">
            <span className="section-badge">Exam Blueprint</span>
            <h2 className="section-title" style={{ marginTop: 6 }}>7 Exam Domains</h2>
            <p className="section-sub">Integration + Solution Design = 36% — more than a third of the exam</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 760 }}>
            {domains.map((d) => {
              const dc = domainColors[d.code];
              const pctNum = parseInt(d.pct);
              return (
                <div key={d.code} style={{
                  padding: '16px 20px', borderRadius: 10,
                  background: 'var(--surface)', border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                      border: `1px solid ${dc.border}`, background: dc.bg, color: dc.text,
                    }}>{d.code}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', flex: 1 }}>{d.label}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', marginRight: 8 }}>{d.q}q</span>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>{d.pct}</span>
                  </div>
                  <div style={{ height: 3, background: 'var(--line)', borderRadius: 2, marginBottom: 10, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pctNum * 5}%`, background: dc.border, borderRadius: 2 }} />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>{d.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
