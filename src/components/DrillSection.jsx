import { useState, useEffect, useCallback } from 'react';
import { drillQuestions } from '../data/drillData';

const DOMAIN_LABELS = {
  D1: 'Agentic Architecture',
  D2: 'Agent Operations',
  D3: 'Prompt Engineering',
  D4: 'Tool Design & MCP',
  D5: 'Context & Reliability',
};
const DOMAIN_COLORS = {
  D1: { bg: 'var(--accent-dim)', text: 'var(--accent-text)', border: 'var(--accent)' },
  D2: { bg: '#FEF3C7', text: '#92400E', border: '#D97706' },
  D3: { bg: '#F5F3FF', text: '#5B21B6', border: '#7C3AED' },
  D4: { bg: '#DCFCE7', text: '#14532D', border: '#16A34A' },
  D5: { bg: '#FEE2E2', text: '#7F1D1D', border: '#DC2626' },
};
const LETTERS = ['A', 'B', 'C', 'D'];
const DOMAINS = ['All', 'D1', 'D2', 'D3', 'D4', 'D5'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DrillSection() {
  const [domainFilter, setDomainFilter] = useState('All');
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null); // index of clicked option
  const [session, setSession] = useState({ correct: 0, total: 0 });
  const [shuffled, setShuffled] = useState(false);

  // Build queue whenever filter or shuffle changes
  useEffect(() => {
    const filtered = domainFilter === 'All'
      ? drillQuestions
      : drillQuestions.filter((q) => q.domain === domainFilter);
    setQueue(shuffled ? shuffle(filtered) : filtered);
    setIdx(0);
    setPicked(null);
    setSession({ correct: 0, total: 0 });
  }, [domainFilter, shuffled]);

  const current = queue[idx];
  const isAnswered = true; // always reveal answer immediately
  const isCorrect = picked !== null && picked === current?.correct;

  const handlePick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    setSession((s) => ({
      correct: s.correct + (i === current.correct ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const handleNext = useCallback(() => {
    if (idx < queue.length - 1) {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  }, [idx, queue.length]);

  const handlePrev = () => {
    if (idx > 0) {
      setIdx((i) => i - 1);
      setPicked(null);
    }
  };

  const handleRestart = () => {
    setQueue(shuffled ? shuffle(queue) : [...queue]);
    setIdx(0);
    setPicked(null);
    setSession({ correct: 0, total: 0 });
  };

  // Keyboard: 1-4 mark your pick, → next, ← prev
  useEffect(() => {
    const onKey = (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) handlePick(Number(e.key) - 1);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, picked, current]);

  const domainColor = current ? DOMAIN_COLORS[current.domain] : null;

  // Empty state
  if (drillQuestions.length === 0) {
    return (
      <div className="page">
        <div className="page-hero">
          <span className="section-badge">Drill Mode</span>
          <h1 className="page-title">Drill Mode</h1>
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>
            Questions will appear here. Send them over and they'll be loaded in.
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="page">
      {/* Hero */}
      <div className="page-hero" style={{ paddingBottom: 20 }}>
        <span className="section-badge">Drill Mode</span>
        <h1 className="page-title" style={{ marginBottom: 12 }}>Drill Mode</h1>

        {/* Domain filter tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          {DOMAINS.map((d) => {
            const count = d === 'All'
              ? drillQuestions.length
              : drillQuestions.filter((q) => q.domain === d).length;
            if (count === 0 && d !== 'All') return null;
            const active = domainFilter === d;
            const dc = d !== 'All' ? DOMAIN_COLORS[d] : null;
            return (
              <button
                key={d}
                onClick={() => setDomainFilter(d)}
                style={{
                  padding: '5px 14px', borderRadius: 20, cursor: 'pointer',
                  fontSize: '0.72rem', fontWeight: 600, fontFamily: 'inherit',
                  border: `1px solid ${active && dc ? dc.border : active ? 'var(--accent)' : 'var(--line)'}`,
                  background: active && dc ? dc.bg : active ? 'var(--accent-dim)' : 'var(--raised)',
                  color: active && dc ? dc.text : active ? 'var(--accent-text)' : 'var(--muted)',
                  transition: 'all 0.12s',
                }}
              >
                {d === 'All' ? 'All' : `${d} · ${DOMAIN_LABELS[d]}`}
                <span style={{ marginLeft: 6, opacity: 0.65 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Session stats + shuffle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Progress', value: `${idx + 1} / ${queue.length}` },
              { label: 'Session', value: `${session.correct} / ${session.total}` },
              { label: 'Accuracy', value: session.total ? `${Math.round((session.correct / session.total) * 100)}%` : '—' },
            ].map((s) => (
              <div key={s.label} className="stat" style={{ minWidth: 'unset' }}>
                <strong style={{ fontSize: '1rem' }}>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.75rem', color: 'var(--muted)', marginLeft: 'auto' }}>
            <input
              type="checkbox"
              checked={shuffled}
              onChange={(e) => setShuffled(e.target.checked)}
              style={{ accentColor: 'var(--accent)', width: 14, height: 14 }}
            />
            Shuffle
          </label>
        </div>
      </div>

      <div className="page-body">
        <div style={{ padding: '20px 52px 52px' }}>

          {/* Progress bar */}
          <div style={{
            height: 4, background: 'var(--line)', borderRadius: 2, marginBottom: 24, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: 2, background: 'var(--accent)',
              width: `${((idx + 1) / queue.length) * 100}%`,
              transition: 'width 0.3s ease',
            }} />
          </div>

          {/* Navigation — fixed position above card */}
          {current && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
              <button
                onClick={handlePrev}
                disabled={idx === 0}
                style={{
                  padding: '8px 18px', borderRadius: 6, border: '1px solid var(--line)',
                  background: 'var(--raised)', color: 'var(--muted)', cursor: idx === 0 ? 'default' : 'pointer',
                  fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit', opacity: idx === 0 ? 0.4 : 1,
                }}
              >
                ← Prev
              </button>
              <button
                onClick={handleNext}
                disabled={idx === queue.length - 1}
                style={{
                  padding: '8px 22px', borderRadius: 6,
                  border: '1px solid var(--accent)', background: 'var(--accent)',
                  color: '#fff', cursor: idx === queue.length - 1 ? 'default' : 'pointer',
                  fontSize: '0.8rem', fontWeight: 700, fontFamily: 'inherit',
                  opacity: idx === queue.length - 1 ? 0.4 : 1, transition: 'all 0.15s',
                }}
              >
                Next →
              </button>
              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--faint)' }}>
                Keys: 1–4 pick · → next · ← prev
              </span>
            </div>
          )}

          {/* Question card */}
          {current && (
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--line)',
              borderRadius: 10, padding: '24px 28px',
              boxShadow: 'var(--shadow-md)',
            }}>
              {/* Domain badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                {domainColor && (
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px',
                    borderRadius: 4, letterSpacing: '0.05em',
                    background: domainColor.bg, color: domainColor.text,
                    border: `1px solid ${domainColor.border}`,
                  }}>
                    {current.domain} · {DOMAIN_LABELS[current.domain]}
                  </span>
                )}
                <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--faint)', fontWeight: 600 }}>
                  Q {idx + 1} of {queue.length}
                </span>
              </div>

              {/* Question text */}
              <p style={{
                fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.65,
                color: 'var(--ink)', marginBottom: 24,
              }}>
                {current.question}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {current.options.map((opt, i) => {
                  const isThisCorrect = i === current.correct;
                  const isThisPicked = i === picked;
                  let bg = 'var(--raised)';
                  let border = 'var(--line)';
                  let letterBg = 'var(--line)';
                  let letterColor = 'var(--muted)';
                  let textColor = 'var(--ink-2)';
                  let cursor = isAnswered ? 'default' : 'pointer';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      bg = 'var(--ok-bg)'; border = 'var(--ok)';
                      letterBg = 'var(--ok)'; letterColor = '#fff'; textColor = 'var(--ok)';
                    } else if (isThisPicked) {
                      bg = 'var(--err-bg)'; border = 'var(--err)';
                      letterBg = 'var(--err)'; letterColor = '#fff'; textColor = 'var(--err)';
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handlePick(i)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        padding: '12px 16px', borderRadius: 8,
                        border: `1.5px solid ${border}`,
                        background: bg, cursor,
                        fontFamily: 'inherit', textAlign: 'left',
                        transition: 'all 0.15s',
                        transform: !isAnswered ? undefined : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isAnswered) e.currentTarget.style.borderColor = 'var(--accent)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isAnswered) e.currentTarget.style.borderColor = 'var(--line)';
                      }}
                    >
                      <span style={{
                        minWidth: 24, height: 24, borderRadius: 5,
                        background: letterBg, color: letterColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.72rem', fontWeight: 700, flexShrink: 0,
                        transition: 'all 0.15s',
                      }}>
                        {LETTERS[i]}
                      </span>
                      <span style={{ fontSize: '0.88rem', lineHeight: 1.55, color: textColor, fontWeight: isThisCorrect && isAnswered ? 600 : 400 }}>
                        {opt}
                        {isThisCorrect && isAnswered && (
                          <span style={{ marginLeft: 6, fontSize: '0.75rem', color: 'var(--ok)', fontWeight: 700 }}>✓ Correct</span>
                        )}
                        {isThisPicked && !isThisCorrect && isAnswered && (
                          <span style={{ marginLeft: 6, fontSize: '0.75rem', color: 'var(--err)', fontWeight: 700 }}>✗ Your answer</span>
                        )}
                        {current.trap && current.trap.index === i && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 3,
                            marginLeft: 8, fontSize: '0.65rem', fontWeight: 700,
                            padding: '1px 6px', borderRadius: 4,
                            background: '#FEF3C7', color: '#92400E',
                            border: '1px solid #D97706', verticalAlign: 'middle',
                          }}>
                            ⚠ Trap
                          </span>
                        )}
                      </span>
                      {current.trap && current.trap.index === i && current.trap.note && (
                        <span style={{
                          display: 'block', marginTop: 4, fontSize: '0.72rem',
                          color: '#92400E', fontStyle: 'italic', lineHeight: 1.4,
                        }}>
                          {current.trap.note}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation — always visible */}
              {current.explanation && (
                <div style={{
                  marginTop: 20, padding: '14px 16px',
                  background: picked === null ? 'var(--raised)' : isCorrect ? 'var(--ok-bg)' : 'var(--err-bg)',
                  border: `1px solid ${picked === null ? 'var(--line)' : isCorrect ? 'var(--ok)' : 'var(--err)'}`,
                  borderRadius: 8, fontSize: '0.85rem', lineHeight: 1.7,
                  color: 'var(--ink-2)', whiteSpace: 'pre-line',
                }}>
                  <strong style={{
                    color: picked === null ? 'var(--accent)' : isCorrect ? 'var(--ok)' : 'var(--err)',
                    marginRight: 6,
                  }}>
                    {picked === null ? 'Explanation —' : isCorrect ? '✓ Correct —' : '✗ Incorrect —'}
                  </strong>
                  {current.explanation}
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
