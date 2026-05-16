import GameSelector             from "../components/ui/GameSelector.jsx";
import PurchaseIntelligenceCard from "../components/dashboard/PurchaseIntelligenceCard.jsx";
import HistoricalPriceChart     from "../components/dashboard/HistoricalPriceChart.jsx";
import AnalyticsSummary         from "../components/dashboard/AnalyticsSummary.jsx";
import PriceDropCard            from "../components/dashboard/PriceDropCard.jsx";
import { priceDropGames }       from "../data/mockData.js";

/*
  Dashboard — assembles all sections into the scrollable main content area

  Props:
    selectedGame    string    — current game name shown across all cards
    setSelectedGame function  — updates the selected game via the dropdown
    imageUrls       object    — { hero: "", 1: "", 2: "", 3: "", 4: "" }
    setImageUrl     function  — (key, url) → updates one image slot
*/
const Dashboard = ({ selectedGame, setSelectedGame, imageUrls, setImageUrl }) => (
  <main className="flex-1 overflow-y-auto scrollbar-steam p-6 space-y-5">

    {/* ── Page header with game selector dropdown ── */}
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-xl font-bold text-white">Price Analytics</h1>
        <p className="text-slate-500 text-sm mt-0.5">Game Purchase Intelligence System in {selectedGame}</p>
      </div>
      <GameSelector value={selectedGame} onChange={setSelectedGame} />
    </div>

    {/* ── Hero card — purchase intelligence + price gauge ── */}
    <PurchaseIntelligenceCard
      selectedGame={selectedGame}
      heroImageUrl={imageUrls["hero"]}
      onHeroImageChange={(url) => setImageUrl("hero", url)}
    />

    {/* ── Price chart (flex-1) + analytics stats panel (fixed w-52) ── */}
    <div className="flex gap-5">
      <HistoricalPriceChart />
      <AnalyticsSummary />
    </div>

    {/* ── Active price drop cards grid ── */}
    <div>
      {/* Section heading with pulsing live indicator */}
      <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#4ecca3] inline-block animate-pulse" />
        Active Price Drops &amp; Alerts
      </h3>

      {/* 4-column grid — one PriceDropCard per game */}
      <div className="grid grid-cols-4 gap-4">
        {priceDropGames.map((game) => (
          <PriceDropCard
            key={game.id}
            game={game}
            imageUrl={imageUrls[game.id] ?? ""}
            onImageChange={(url) => setImageUrl(game.id, url)}
          />
        ))}
      </div>
    </div>

  </main>
);

export default Dashboard;
