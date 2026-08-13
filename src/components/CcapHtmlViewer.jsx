export default function CcapHtmlViewer({ src, title }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100svh' }}>
      <div style={{
        padding: '10px 20px', background: 'var(--surface)',
        borderBottom: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
      }}>
        <span className="section-badge">{title}</span>
        <a
          href={src} target="_blank" rel="noreferrer"
          style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
        >
          Open in new tab ↗
        </a>
      </div>
      <iframe
        src={src}
        title={title}
        style={{ flex: 1, border: 'none', width: '100%' }}
        allow="same-origin"
      />
    </div>
  );
}
