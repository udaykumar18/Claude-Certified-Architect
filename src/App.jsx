import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ScenarioSection from './components/ScenarioSection';
import PracticeSection from './components/PracticeSection';
import MockTestSection from './components/MockTestSection';
import DrillSection from './components/DrillSection';
import CcapOverview from './components/CcapOverview';
import CcapCheatsheet from './components/CcapCheatsheet';
import CcapHtmlViewer from './components/CcapHtmlViewer';
import { scenarios } from './data/scenarioData';
import { ccapDrillQuestions } from './data/ccapDrillData';
import './App.css';

const domains = [
  { label: 'D1 Agentic Architecture', pct: '27%' },
  { label: 'D2 Agent Operations', pct: '20%' },
  { label: 'D3 Prompt Engineering', pct: '20%' },
  { label: 'D4 Tool Design & MCP', pct: '18%' },
  { label: 'D5 Context & Reliability', pct: '15%' },
];

function getInitialTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function OverviewPage() {
  return (
    <div className="page">
      <div className="page-hero">
        <h1>
          CCA-F Exam Prep<br />
          <span className="hero-accent">All 6 Scenarios + Interactive Quizzes</span>
        </h1>
        <p>Complete study guide for the Claude Certified Architect – Foundations exam.</p>
        <div className="exam-stats">
          {[
            { label: 'Questions (MCQ)', value: '60' },
            { label: 'Minutes', value: '120' },
            { label: 'Passing score', value: '720/1000' },
            { label: 'Domains', value: '5' },
            { label: 'Scenarios', value: '6' },
          ].map((s) => (
            <div key={s.label} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="page-body">
        <div className="section-header">
          <span className="section-badge">Exam Overview</span>
          <h2 className="section-title">5 Exam Domains</h2>
          <p className="section-sub">Know the weights — focus your study time accordingly</p>
        </div>
        <div className="domain-bar">
          {domains.map((d) => (
            <span key={d.label} className="domain-chip">
              {d.label} <span className="domain-pct">{d.pct}</span>
            </span>
          ))}
        </div>
        <div className="content">
          <table>
            <thead>
              <tr><th>Scenario</th><th>Domain Focus</th><th>Key Topics</th></tr>
            </thead>
            <tbody>
              <tr><td>1 – Customer Support Agent</td><td>D1, D2, D4</td><td>Routing, HITL, tool use, escalation, conversation state</td></tr>
              <tr><td>2 – Multi-Agent Research System</td><td>D1, D2</td><td>Agentic loop, workflow patterns, RAG, memory types</td></tr>
              <tr><td>3 – Code Generation with Claude Code</td><td>D1, D4</td><td>Built-in tools, PR automation, agentic coding loop</td></tr>
              <tr><td>4 – Developer Productivity</td><td>D4, D3</td><td>CLAUDE.md, slash commands, MCP servers, settings.json</td></tr>
              <tr><td>5 – Claude Code for CI/CD</td><td>D1, D2</td><td>Headless mode (-p), JSON output, session isolation</td></tr>
              <tr><td>6 – Structured Data Extraction</td><td>D3, D5</td><td>tool_choice forcing, nullable fields, citations, Batch API</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CcapDrillPage() {
  if (ccapDrillQuestions.length === 0) {
    return (
      <div className="page">
        <div className="page-hero" style={{ paddingBottom: 20 }}>
          <span className="section-badge">Drill Mode</span>
          <h1 className="page-title" style={{ marginBottom: 8 }}>CCA-P Drill Mode</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
            Questions will appear here as we study each domain.
          </p>
        </div>
        <div className="page-body">
          <div className="coming-soon">
            <strong>No questions yet</strong>
            Start sharing CCA-P questions and we'll build this out domain by domain.
          </div>
        </div>
      </div>
    );
  }
  return <DrillSection />;
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activePage, setActivePage] = useState('overview');
  const [examMode, setExamMode] = useState('ccaf');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-exam', examMode);
  }, [examMode]);

  const handleNav = (id) => {
    setActivePage(id);
    document.getElementById('main-scroll')?.scrollTo({ top: 0 });
  };

  const handleExamChange = (mode) => {
    setExamMode(mode);
    setActivePage(mode === 'ccaf' ? 'overview' : 'ccap-overview');
  };

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const activeScenario = scenarios.find((s) => s.id === activePage);

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        onNav={handleNav}
        theme={theme}
        onToggleTheme={toggleTheme}
        examMode={examMode}
        onExamChange={handleExamChange}
      />

      <main className="main" id="main-scroll">
        {/* CCA-F pages */}
        {examMode === 'ccaf' && activePage === 'overview' && <OverviewPage />}
        {examMode === 'ccaf' && activePage === 'drill' && <DrillSection />}
        {examMode === 'ccaf' && activePage.startsWith('practice-') && (
          <PracticeSection key={activePage} setId={activePage.replace('practice-', '')} />
        )}
        {examMode === 'ccaf' && activePage.startsWith('mock-') && (
          <MockTestSection key={activePage} testId={activePage.replace('mock-', '')} />
        )}
        {examMode === 'ccaf' && activeScenario && (
          <ScenarioSection key={activeScenario.id} scenario={activeScenario} />
        )}

        {/* CCA-P pages */}
        {examMode === 'ccap' && activePage === 'ccap-overview'   && <CcapOverview />}
        {examMode === 'ccap' && activePage === 'ccap-drill'      && <CcapDrillPage />}
        {examMode === 'ccap' && activePage === 'ccap-cheatsheet' && <CcapCheatsheet />}
        {examMode === 'ccap' && activePage === 'ccap-exam-sim'   && <CcapHtmlViewer src="/ccar-p-exam-simulation.html" title="Exam Simulation" />}
        {examMode === 'ccap' && activePage === 'ccap-practice'   && <CcapHtmlViewer src="/ccar-p-practice-exam.html" title="Practice Exam" />}
      </main>
    </div>
  );
}
