import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";
import { priceHistory } from "../../data/mockData.js";

/* Teal dot with event label — only renders on data points that have an event property */
const EventDot = ({ cx, cy, payload }) => {
  if (!payload.event) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill="#0f172a" stroke="#4ecca3" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={3} fill="#4ecca3" />
      <text x={cx} y={cy - 14} textAnchor="middle" fill="#94a3b8" fontSize={10}>{payload.event}</text>
    </g>
  );
};

/* Tooltip card shown on hover */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0f1923] border border-[#2a3a50] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-[#4ecca3] font-semibold text-sm price-mono">${payload[0]?.value?.toFixed(2)}</p>
    </div>
  );
};

/*
  HistoricalPriceChart — Recharts line chart showing 12-month price history
  Features:
  - Teal price line with event dots (Winter Sale, Summer Sale, etc.)
  - Red dashed reference line at the all-time historical low ($24.99)
  - Timeline dropdown filters to last 3 / 6 / 12 months of data
*/
const HistoricalPriceChart = () => {
  const [timeline, setTimeline] = useState("12 Month Timeline");

  /* Slice the data array based on the selected timeline */
  const chartData =
    timeline === "3 Month Timeline" ? priceHistory.slice(-3) :
    timeline === "6 Month Timeline" ? priceHistory.slice(-6) :
    priceHistory;

  return (
    <div className="flex-1 card-steam p-5">

      {/* Chart header with timeline selector */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-sm">Historical Price Trend</h3>
        <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="input-steam px-3 py-1.5 text-xs">
          <option>12 Month Timeline</option>
          <option>6 Month Timeline</option>
          <option>3 Month Timeline</option>
        </select>
      </div>

      {/* Recharts line chart — fills the card width, fixed 220px height */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 24, right: 10, left: 0, bottom: 10 }}>
          {/* Horizontal grid lines only */}
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2a3a" vertical={false} />

          {/* Month labels on X axis */}
          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "#1e2a3a" }} tickLine={false} />

          {/* Price labels on Y axis — fixed range so chart doesn't jump when filtering */}
          <YAxis domain={[22, 31]} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} width={42}
            label={{ value: "Price (USD)", angle: -90, position: "insideLeft", offset: 10, style: { fill: "#475569", fontSize: 10 } }}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Red dashed line marks the all-time historical low */}
          <ReferenceLine y={24.99} stroke="#ef4444" strokeDasharray="5 3" strokeWidth={1.5}
            label={{ value: "Lowest Historical Price: $24.99", position: "insideBottomLeft", fill: "#ef4444", fontSize: 10 }}
          />

          {/* The price line — uses EventDot for points that have sale events */}
          <Line type="monotone" dataKey="price" stroke="#4ecca3" strokeWidth={2}
            dot={(props) => <EventDot {...props} />}
            activeDot={{ r: 5, fill: "#4ecca3", stroke: "#0f172a", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-center text-slate-600 text-xs mt-1">{timeline}</p>
    </div>
  );
};

export default HistoricalPriceChart;
