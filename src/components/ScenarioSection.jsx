import { useState } from 'react';
import QuizCard from './QuizCard';
import { S1Content, S2Content, S3Content, S4Content, S5Content, S6Content } from './ScenarioContent';
import { s2Questions, s3Questions, s4Questions, s6Questions } from '../data/quizData';

const contentMap = { s1: S1Content, s2: S2Content, s3: S3Content, s4: S4Content, s5: S5Content, s6: S6Content };
const quizMap = { s2: s2Questions, s3: s3Questions, s4: s4Questions, s6: s6Questions };

export default function ScenarioSection({ scenario }) {
  const [tab, setTab] = useState('summary');
  const Content = contentMap[scenario.id];
  const questions = quizMap[scenario.quizKey];

  // Reset tab when scenario changes
  // (key prop on parent in App.jsx handles this)

  return (
    <div className="page">
      <div className="page-hero">
        <span className="section-badge">{scenario.badge}</span>
        <h1 className="page-title">{scenario.title}</h1>
        <p className="section-sub">{scenario.sub}</p>
      </div>

      <div className="page-body">
        <div className="tabs">
          <button className={`tab-btn ${tab === 'summary' ? 'active' : ''}`} onClick={() => setTab('summary')}>
            Summary
          </button>
          <button className={`tab-btn ${tab === 'cheatsheet' ? 'active' : ''}`} onClick={() => setTab('cheatsheet')}>
            Cheat Sheet
          </button>
          {scenario.hasQuiz && (
            <button className={`tab-btn ${tab === 'quiz' ? 'active' : ''}`} onClick={() => setTab('quiz')}>
              Quiz · {questions?.length}Q
            </button>
          )}
        </div>

        {tab === 'summary' && <Content />}

        {tab === 'cheatsheet' && (
          <div className="content">
            <table className="cheat-table">
              <thead><tr><th>#</th><th>Key Point</th></tr></thead>
              <tbody>
                {scenario.examPoints.map((pt, i) => (
                  <tr key={i}>
                    <td className="num-cell">{i + 1}</td>
                    <td>{pt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'quiz' && (
          <div className="quiz-list">
            {scenario.hasQuiz ? (
              questions.map((q, i) => <QuizCard key={i} question={q} index={i} />)
            ) : (
              <div className="coming-soon">
                <strong>Quiz coming soon</strong>
                <p>Practice questions for this scenario will be added here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
