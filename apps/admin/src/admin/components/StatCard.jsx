export default function StatCard({ icon, label, value, trend }) {
  return (
    <div className="sc-card">
      <div className="sc-left">
        <div className="sc-icon">{icon}</div>
      </div>
      <div className="sc-right">
        <div className="sc-value">{value}</div>
        <div className="sc-label">{label} {trend ? <span className="sc-trend">{trend}</span> : null}</div>
      </div>
    </div>
  );
}
