import { useState } from 'react';
import { mockTests } from '../data/mockTestData';

const DOMAIN_LABELS = {
  D1: 'Agentic Architecture',
  D2: 'Agent Operations',
  D3: 'Prompt Engineering',
  D4: 'Tool Design & MCP',
  D5: 'Context & Reliability',
};

const LETTERS = ['A', 'B', 'C', 'D'];

function QuestionCard({ question, index }) {
  const isWrongQ = !question.userCorrect;

  return (
    <div className="mq-card">
      {/* Header row */}
      <div className="mq-header">
        <span className="mq-meta">
          <span className="mq-id">{question.qId}</span>
          {question.domain && (
            <>
              <span className="mq-dot">·</span>
              <span className="mq-domain">{question.domain}</span>
              <span className="mq-dot">·</span>
              <span className="mq-domain-label">{DOMAIN_LABELS[question.domain]}</span>
            </>
          )}
        </span>
        <span className={`mq-verdict ${question.userCorrect ? 'correct' : 'wrong'}`}>
          {question.userCorrect ? 'Correct' : 'Incorrect'}
        </span>
      </div>

      {/* Question text */}
      <p className="mq-question">{question.question}</p>

      {/* Options */}
      <div className="mq-options">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correct;
          const isUserWrong = isWrongQ && i === question.userAnswer;
          const status = isCorrect ? 'correct' : isUserWrong ? 'wrong' : 'neutral';

          return (
            <div key={i} className="mq-option-block">
              <div className={`mq-option ${status}`}>
                <span className={`mq-letter ${status}`}>{LETTERS[i]}</span>
                <span className="mq-opt-text">{opt}</span>
              </div>
              {isCorrect && question.reason && (
                <div className="mq-explanation correct">
                  {question.reason}
                  <span className="mq-tag correct"> (correct answer)</span>
                </div>
              )}
              {isUserWrong && (
                <div className="mq-explanation wrong">
                  <span className="mq-tag wrong">(your answer)</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MockTestSection({ testId }) {
  const [statusFilter, setStatusFilter] = useState('all');

  const test = mockTests.find((t) => t.id === testId);

  if (!test) return (
    <div className="page">
      <div className="page-hero">
        <span className="section-badge">Practice Tests</span>
        <h1 className="page-title">No test found</h1>
      </div>
    </div>
  );

  const pct = Math.round((test.score.correct / test.score.total) * 100);
  const wrongCount = test.score.total - test.score.correct;
  const wrongAdded = test.questions.filter(q => !q.userCorrect).length;

  const filtered = statusFilter === 'all' ? test.questions
    : statusFilter === 'correct' ? test.questions.filter(q => q.userCorrect)
    : test.questions.filter(q => !q.userCorrect);

  const filterBtnStyle = (active) => ({
    padding: '5px 14px', borderRadius: 6, border: '1px solid var(--line)',
    cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'inherit',
    background: active ? 'var(--accent)' : 'var(--raised)',
    color: active ? '#fff' : 'var(--muted)',
    transition: 'all 0.15s',
  });

  return (
    <div className="page">
      <div className="page-hero">
        <span className="section-badge">Practice Test</span>
        <h1 className="page-title">{test.title}</h1>
        <div className="exam-stats" style={{ marginTop: 16 }}>
          <div className="stat">
            <strong style={{ color: 'var(--ok)' }}>{test.score.correct}</strong>
            <span>Correct</span>
          </div>
          <div className="stat">
            <strong style={{ color: 'var(--err)' }}>{wrongCount}</strong>
            <span>Wrong</span>
          </div>
          <div className="stat">
            <strong>{test.score.total}</strong>
            <span>Total</span>
          </div>
          <div className="stat">
            <strong style={{ color: pct >= 72 ? 'var(--ok)' : 'var(--err)' }}>{pct}%</strong>
            <span>Score</span>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div style={{ padding: '16px 52px 0', display: 'flex', gap: 8 }}>
          {[
            { key: 'all', label: `All ${test.score.total}Q` },
            { key: 'correct', label: `✓ Correct ${test.score.correct}Q` },
            { key: 'wrong', label: `✗ Wrong ${wrongCount}Q` },
          ].map((f) => (
            <button key={f.key} style={filterBtnStyle(statusFilter === f.key)} onClick={() => setStatusFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '20px 52px 52px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {statusFilter === 'wrong' && wrongAdded === 0 ? (
            <div style={{
              background: 'var(--raised)', border: '1px dashed var(--line)',
              borderRadius: 8, padding: '32px 24px', textAlign: 'center',
              color: 'var(--muted)', fontSize: '0.85rem',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>✗</div>
              <strong style={{ display: 'block', marginBottom: 4, color: 'var(--ink-2)' }}>
                {wrongCount} wrong questions pending
              </strong>
              Paste your wrong answers and they'll appear here.
            </div>
          ) : (
            filtered.map((q) => (
              <QuestionCard key={q.qId} question={q} index={test.questions.indexOf(q)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
