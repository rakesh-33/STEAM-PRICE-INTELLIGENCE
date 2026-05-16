/* ── 12-month price history — powers the line chart ── */
export const priceHistory = [
  { month: "Jan", price: 29.99 },
  { month: "Feb", price: 27.50 },
  { month: "Mar", price: 27.00 },
  { month: "Apr", price: 29.99 },
  { month: "May", price: 24.99, event: "Winter Sale" },
  { month: "Jun", price: 26.50 },
  { month: "Jul", price: 24.99, event: "Stanter Sale" },
  { month: "Aug", price: 26.00, event: "Summer Sale" },
  { month: "Sep", price: 27.99 },
  { month: "Oct", price: 28.50 },
  { month: "Nov", price: 27.00 },
  { month: "Dec", price: 24.99 },
];

/* ── Games shown in the Active Price Drops grid ──
   action "Buy"  → teal button
   action "Wait" → ghost button
   imageUrl ""   → shows the image slot placeholder until a URL is pasted  ── */
export const priceDropGames = [
  { id: 1, title: "Elden Ring", current: 29.99, historical: 24.99, action: "Wait", accentColor: "#e8a44a", imageUrl: "" },
  { id: 2, title: "Hades",      current: 29.99, historical: 24.99, action: "Buy",  accentColor: "#4ecca3", imageUrl: "" },
  { id: 3, title: "Hades II",   current: 29.99, historical: 24.99, action: "Wait", accentColor: "#4ecca3", imageUrl: "" },
  { id: 4, title: "Palworld",   current: 29.99, historical: 24.99, action: "Buy",  accentColor: "#7c6af7", imageUrl: "" },
];

/* ── Stats shown in the Analytics Summary panel ──
   trend: true → renders the MiniTrend sparkline next to the value ── */
export const analyticsStats = [
  { label: "Lowest Price Ever",              value: "$24.99",  trend: false },
  { label: "Avg. Discount %",                value: "43.25%",  trend: false },
  { label: "Discount Volatility (High/Low)", value: "53 / 58", trend: false },
  { label: "Monthly Pricing Trend",          value: "$24.99",  trend: true  },
];

/* ── Options for the game selector dropdown ── */
export const gameOptions = [
  "Cyberpunk 2077",
  "Elden Ring",
  "Hades",
  "Red Dead Redemption 2",
  "The Witcher 3",
  "GTA V",
];

/* ── Steam CDN image URLs — paste any of these into an image slot ──
   Cyberpunk 2077 : https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg
   Elden Ring     : https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg
   Hades          : https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg
   Palworld       : https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg  ── */
