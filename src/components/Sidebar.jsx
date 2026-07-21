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

export default function Sidebar({ activePage, onNav, theme, onToggleTheme }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">CCA-F Prep</div>
        <div className="sidebar-subtitle">Claude Certified Architect · Foundations</div>
      </div>

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
      </nav>

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

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
        </button>
      </div>
    </aside>
  );
}
