import { useState } from 'react';

export default function QuizCard({ question, index }) {
  const [revealed, setReveal] = useState(false);

  return (
    <div className={`quiz-card ${question.wasWrong ? 'was-wrong' : ''}`}>
      <div className={`quiz-q-num ${question.wasWrong ? 'wrong-label' : ''}`}>
        Question {index + 1}
        {question.wasWrong && (
          <span className="wrong-badge">⚠ You got this wrong before</span>
        )}
      </div>

      <p className="quiz-question">{question.question}</p>

      <div className="quiz-options">
        {question.options.map((opt, i) => (
          <div
            key={i}
            className={`quiz-option ${revealed && i === question.correct ? 'correct' : ''}`}
          >
            {revealed && i === question.correct && <span className="check">✓</span>}
            {opt}
          </div>
        ))}
      </div>

      {!revealed ? (
        <button className="reveal-btn" onClick={() => setReveal(true)}>
          Show answer
        </button>
      ) : (
        question.reason && (
          <div className="quiz-reason">
            <div className="reason-label">Why this answer</div>
            <p className="quiz-reason-text">{question.reason}</p>
          </div>
        )
      )}
    </div>
  );
}
