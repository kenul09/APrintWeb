// Section heading row: h2 (+ optional subtitle) on the left, optional
// action (e.g. "View all" link) on the right. `id` is for aria-labelledby.
export default function SectionHead({ id, title, subtitle, action }) {
  return (
    <div className="section-head">
      <div>
        <h2 id={id}>{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
