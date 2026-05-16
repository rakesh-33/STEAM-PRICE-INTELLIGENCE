/* Small inline sparkline used next to "Monthly Pricing Trend" in AnalyticsSummary */
const MiniTrend = () => (
  <svg width={48} height={28} viewBox="0 0 48 28">
    <polyline
      points="2,22 10,16 18,18 28,10 36,12 46,4"
      fill="none"
      stroke="#4ecca3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MiniTrend;
