export default function StatusBadge({ status }) {
  const s = String(status || '').toLowerCase();
  const cls = `sb-badge ${s}`;
  return <span className={cls}>{status}</span>;
}
