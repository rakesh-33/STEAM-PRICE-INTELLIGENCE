import PriceGauge from "../ui/PriceGauge.jsx";
import ImageSlot  from "../ui/ImageSlot.jsx";

/*
  PurchaseIntelligenceCard — hero card at the top of the dashboard
  Layout: [ImageSlot 144×112] | [price info] | [PriceGauge]

  Props:
    selectedGame      string    — name of the game being analysed
    heroImageUrl      string    — URL for the hero thumbnail ("" = empty slot)
    onHeroImageChange function  — called with the new URL when user saves
*/
const PurchaseIntelligenceCard = ({ selectedGame, heroImageUrl, onHeroImageChange }) => (
  <div className="card-steam p-5 flex gap-5 animate-fadeIn">

    {/* Game cover — click the slot to paste any image URL */}
    <ImageSlot
      imageUrl={heroImageUrl}
      onUrlChange={onHeroImageChange}
      className="w-36 h-28"
      alt={`${selectedGame ?? "Game"} cover art`}
    />

    {/* Price intelligence info */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-white font-semibold text-base">Purchase Intelligence</h2>
        <button className="btn-teal">BUY NOW</button>
      </div>

      <div className="space-y-2 text-sm">
        {/* Current price with discount badge */}
        <p className="text-slate-400">
          Current Price:{" "}
          <span className="text-[#4ecca3] font-semibold price-mono">$29.99</span>{" "}
          <span className="text-slate-500">(60% Off)</span>
        </p>

        {/* AI-generated recommendation */}
        <p className="text-slate-400">
          Recommendation:{" "}
          <span className="text-[#fbbf24] font-medium">Highly Recommend (Close to historical low)</span>
        </p>

        {/* Price competitiveness range */}
        <p className="text-slate-400">
          Price Competitive Status:{" "}
          <span className="text-slate-300 price-mono">$24.99 to 60% Off</span>
        </p>
      </div>
    </div>

    {/* Price gauge — needle at 72 = green-yellow zone (competitive price) */}
    <div className="shrink-0 flex flex-col items-center justify-center gap-1">
      <p className="text-slate-400 text-xs text-center">Price Competitive</p>
      <PriceGauge score={72} />
      <p className="text-slate-500 text-[10px] text-center">Competitiveness Index</p>
    </div>

  </div>
);

export default PurchaseIntelligenceCard;
