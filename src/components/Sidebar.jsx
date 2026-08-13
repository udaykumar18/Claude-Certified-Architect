import { scenarios } from '../data/scenarioData';
import { practiceSets } from '../data/practiceData';
import { mockTests } from '../data/mockTestData';

const practiceIcons = {
  master: 'D1-5',
  cicd: 'CI',
  config: 'CFG',
  deterministic: 'D/P',
  devprod: 'DEV',
  extraction: 'EXT',
};

export default function Sidebar({ activePage, onNav, theme, onToggleTheme, examMode, onExamChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* Exam selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
          {[
            { id: 'ccaf', label: 'CCA-F', sub: 'Foundations' },
            { id: 'ccap', label: 'CCA-P', sub: 'Professional' },
          ].map((e) => {
            const active = examMode === e.id;
            return (
              <button
                key={e.id}
                onClick={() => onExamChange(e.id)}
                style={{
                  flex: 1, padding: '6px 0', borderRadius: 6, cursor: 'pointer',
                  fontSize: '0.72rem', fontWeight: 700, fontFamily: 'inherit',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
                  background: active ? 'var(--accent)' : 'transparent',
                  color: active ? '#fff' : 'var(--muted)',
                  transition: 'all 0.15s',
                  lineHeight: 1.3,
                }}
              >
                {e.label}
                <span style={{ display: 'block', fontSize: '0.55rem', fontWeight: 500, opacity: 0.75 }}>
                  {e.sub}
                </span>
              </button>
            );
          })}
        </div>

        <div className="sidebar-logo">
          {examMode === 'ccaf' ? 'CCA-F Prep' : 'CCA-P Prep'}
        </div>
        <div className="sidebar-subtitle">
          {examMode === 'ccaf'
            ? 'Claude Certified Architect · Foundations'
            : 'Claude Certified Architect · Professional'}
        </div>
      </div>

      {examMode === 'ccaf' ? (
        <nav className="sidebar-nav">
          <div className="nav-group-label">Overview</div>
          <button
            className={`nav-item ${activePage === 'overview' ? 'active' : ''}`}
            onClick={() => onNav('overview')}
          >
            <span className="nav-num">→</span>
            <span className="nav-text">Exam Guide</span>
          </button>

          <div className="nav-group-label">Scenarios</div>
          {scenarios.map((s) => (
            <button
              key={s.id}
              className={`nav-item ${activePage === s.id ? 'active' : ''}`}
              onClick={() => onNav(s.id)}
            >
              <span className="nav-num">{s.num}</span>
              <span className="nav-text">{s.title}</span>
            </button>
          ))}

          <div className="nav-group-label">Drill Mode</div>
          <button
            className={`nav-item ${activePage === 'drill' ? 'active' : ''}`}
            onClick={() => onNav('drill')}
          >
            <span className="nav-num" style={{ fontSize: '0.6rem' }}>⚡</span>
            <span className="nav-text">Drill Mode</span>
          </button>

          <div className="nav-group-label">Practice Sets</div>
          {practiceSets.map((s) => (
            <button
              key={s.id}
              className={`nav-item ${activePage === `practice-${s.id}` ? 'active' : ''}`}
              onClick={() => onNav(`practice-${s.id}`)}
            >
              <span className="nav-num" style={{ fontSize: '0.55rem', letterSpacing: 0 }}>
                {practiceIcons[s.id] || '★'}
              </span>
              <span className="nav-text">{s.label}</span>
              <span style={{
                marginLeft: 'auto', fontSize: '0.6rem', fontWeight: 700,
                color: 'var(--faint)', flexShrink: 0,
              }}>
                {s.questions.length}Q
              </span>
            </button>
          ))}

          <div className="nav-group-label">Practice Tests</div>
          {mockTests.length === 0 && (
            <div style={{ fontSize: '0.75rem', color: 'var(--faint)', padding: '4px 9px' }}>
              No tests yet
            </div>
          )}
          {mockTests.map((t) => {
            const pct = Math.round((t.score.correct / t.score.total) * 100);
            return (
              <button
                key={t.id}
                className={`nav-item ${activePage === `mock-${t.id}` ? 'active' : ''}`}
                onClick={() => onNav(`mock-${t.id}`)}
              >
                <span className="nav-num" style={{ fontSize: '0.55rem' }}>T{mockTests.indexOf(t) + 1}</span>
                <span className="nav-text">{t.title}</span>
                <span style={{
                  marginLeft: 'auto', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0,
                  color: pct >= 72 ? 'var(--ok)' : 'var(--err)',
                }}>{pct}%</span>
              </button>
            );
          })}
        </nav>
      ) : (
        <nav className="sidebar-nav">
          <div className="nav-group-label">Overview</div>
          <button
            className={`nav-item ${activePage === 'ccap-overview' ? 'active' : ''}`}
            onClick={() => onNav('ccap-overview')}
          >
            <span className="nav-num">→</span>
            <span className="nav-text">Exam Guide</span>
          </button>

          <div className="nav-group-label">Drill Mode</div>
          <button
            className={`nav-item ${activePage === 'ccap-drill' ? 'active' : ''}`}
            onClick={() => onNav('ccap-drill')}
          >
            <span className="nav-num" style={{ fontSize: '0.6rem' }}>⚡</span>
            <span className="nav-text">Drill Mode</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.6rem', color: 'var(--faint)', fontWeight: 600 }}>0Q</span>
          </button>

          <div className="nav-group-label">Resources</div>
          {[
            { id: 'ccap-cheatsheet',  icon: '📋', label: 'Cheatsheet' },
            { id: 'ccap-exam-sim',    icon: '🧪', label: 'Exam Simulation' },
            { id: 'ccap-practice',    icon: '📝', label: 'Practice Exam' },
          ].map((r) => (
            <button
              key={r.id}
              className={`nav-item ${activePage === r.id ? 'active' : ''}`}
              onClick={() => onNav(r.id)}
            >
              <span className="nav-num" style={{ fontSize: '0.7rem' }}>{r.icon}</span>
              <span className="nav-text">{r.label}</span>
            </button>
          ))}

          <div className="nav-group-label">Practice Tests</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--faint)', padding: '4px 9px' }}>
            Coming as we study
          </div>
        </nav>
      )}

      <div className="sidebar-footer">
        {examMode === 'ccaf' && (
          <button className="theme-toggle" onClick={onToggleTheme}>
            {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
          </button>
        )}
        {examMode === 'ccap' && (
          <div style={{ fontSize: '0.65rem', color: 'var(--faint)', textAlign: 'center', padding: '4px 0', letterSpacing: '0.04em' }}>
            CCA-P · Always dark theme
          </div>
        )}
      </div>
    </aside>
  );
}
