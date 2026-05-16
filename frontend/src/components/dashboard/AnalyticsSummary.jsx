import MiniTrend        from "../ui/MiniTrend.jsx";
import { analyticsStats } from "../../data/mockData.js";

/*
  AnalyticsSummary — right-side stats panel beside the price chart
  Renders each stat from analyticsStats in mockData.js
  Stats with trend: true get a MiniTrend sparkline next to the value
*/
const AnalyticsSummary = () => (
  <div className="w-52 card-steam p-4 shrink-0">
    <h3 className="text-white font-semibold text-sm mb-4">Analytics Summary</h3>

    <div className="space-y-4">
      {analyticsStats.map((stat, i) => (
        <div key={i}>
          {/* Stat label */}
          <p className="text-slate-500 text-xs mb-0.5 leading-tight">{stat.label}</p>

          {/* Stat value + optional sparkline */}
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm price-mono">{stat.value}</span>
            {stat.trend && <MiniTrend />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AnalyticsSummary;
