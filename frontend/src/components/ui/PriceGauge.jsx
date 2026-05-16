/*
  PriceGauge — half-circle arc gauge with a needle
  score 0–100: 0 = far left (green / cheap), 100 = far right (red / overpriced)
  Arc is split into 3 equal segments: green → yellow → red
*/
const PriceGauge = ({ score = 72 }) => {
  const radius     = 60;
  const innerR     = radius - 16;   /* donut thickness */
  const cx = 80, cy = 80;
  const startAngle = -200, endAngle = 20;
  const totalArc   = endAngle - startAngle;

  const toRad = (deg) => (deg * Math.PI) / 180;

  /* Builds one donut-slice SVG path between two degree angles */
  const arcPath = (s, e, r, ir) => {
    const x1 = cx + r  * Math.cos(toRad(s)), y1 = cy + r  * Math.sin(toRad(s));
    const x2 = cx + r  * Math.cos(toRad(e)), y2 = cy + r  * Math.sin(toRad(e));
    const ix1 = cx + ir * Math.cos(toRad(e)), iy1 = cy + ir * Math.sin(toRad(e));
    const ix2 = cx + ir * Math.cos(toRad(s)), iy2 = cy + ir * Math.sin(toRad(s));
    const large = e - s > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${ir} ${ir} 0 ${large} 0 ${ix2} ${iy2} Z`;
  };

  const segments = [
    { start: startAngle,                   end: startAngle + totalArc * 0.33, color: "#22c55e" },
    { start: startAngle + totalArc * 0.33, end: startAngle + totalArc * 0.66, color: "#eab308" },
    { start: startAngle + totalArc * 0.66, end: endAngle,                     color: "#ef4444" },
  ];

  /* Needle tip position based on score */
  const needleAngle = startAngle + (score / 100) * totalArc;
  const nx = cx + (radius - 8) * Math.cos(toRad(needleAngle));
  const ny = cy + (radius - 8) * Math.sin(toRad(needleAngle));

  return (
    <svg width={160} height={100} viewBox="0 0 160 100">
      {/* Colored arc segments */}
      {segments.map((s, i) => (
        <path key={i} d={arcPath(s.start, s.end, radius, innerR)} fill={s.color} opacity={0.85} />
      ))}
      {/* Needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
      {/* Center pivot dot */}
      <circle cx={cx} cy={cy} r={5} fill="white" />
    </svg>
  );
};

export default PriceGauge;
