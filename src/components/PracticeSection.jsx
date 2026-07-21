import { useState } from 'react';
import { practiceSets } from '../data/practiceData';

function PracticeQuizCard({ question, globalIndex }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setReveal] = useState(false);

  const handleSelect = (i) => { if (!revealed) setSelected(i); };
  const handleReveal = () => setReveal(true);
  const handleReset = () => { setSelected(null); setReveal(false); };

  return (
    <div className={`quiz-card ${revealed && selected !== null && selected !== question.correct ? 'was-wrong' : ''}`}>
      <div className="quiz-q-num" style={{ justifyContent: 'space-between' }}>
        <span>Question {globalIndex + 1}</span>
        {revealed && (
          <button onClick={handleReset} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.67rem', color: 'var(--muted)', letterSpacing: '0.05em',
            textTransform: 'uppercase', fontWeight: 700, fontFamily: 'inherit',
          }}>↺ Reset</button>
        )}
      </div>

      <p className="quiz-question">{question.question}</p>

      <div className="quiz-options">
        {question.options.map((opt, i) => {
          let cls = 'quiz-option practice-option';
          if (revealed) {
            if (i === question.correct) cls += ' correct';
            else if (i === selected) cls += ' wrong';
          } else if (selected === i) {
            cls += ' selected';
          }
          return (
            <div key={i} className={cls} onClick={() => handleSelect(i)}
              style={{ cursor: revealed ? 'default' : 'pointer' }}>
              <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
              {revealed && i === question.correct && <span className="check">✓</span>}
              {revealed && i === selected && i !== question.correct && <span style={{ marginRight: 4 }}>✗</span>}
              {opt}
            </div>
          );
        })}
      </div>

      {!revealed ? (
        <button className="reveal-btn" onClick={handleReveal}>
          {selected !== null ? 'Reveal answer' : 'Show answer'}
        </button>
      ) : question.reason && (
        <div className="quiz-reason">
          <div className="reason-label">Why this answer</div>
          <p className="quiz-reason-text">{question.reason}</p>
        </div>
      )}
    </div>
  );
}

export default function PracticeSection({ setId }) {
  const set = practiceSets.find((s) => s.id === setId) || practiceSets[0];

  return (
    <div className="page">
      <div className="page-hero">
        <span className="section-badge">{set.badge}</span>
        <h1 className="page-title">{set.label}</h1>
        <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: '0.9rem' }}>{set.subtitle}</p>
      </div>

      <div className="page-body">
        <div className="quiz-list" style={{ padding: '20px 52px 52px' }}>
          {set.questions.map((q, i) => (
            <PracticeQuizCard key={`${setId}-${i}`} question={q} globalIndex={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { practiceSets };
