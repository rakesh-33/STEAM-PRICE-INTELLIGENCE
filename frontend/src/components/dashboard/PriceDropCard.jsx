import ImageSlot from "../ui/ImageSlot.jsx";

/*
  PriceDropCard — one card in the Active Price Drops grid
  Layout: [ImageSlot 64×64 + title] [current price | historical low | Buy/Wait button]

  Props:
    game          object    — { id, title, current, historical, action, accentColor }
    imageUrl      string    — URL for this card's thumbnail ("" = empty slot)
    onImageChange function  — called with the new URL when user saves
*/
const PriceDropCard = ({ game, imageUrl, onImageChange }) => (
  <div className="card-steam p-4 flex flex-col gap-3 hover:border-[#2a4a5a] transition-all duration-200 animate-fadeIn">

    {/* Top row: thumbnail + title + 3-dot menu */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">

        {/* Game thumbnail — click to paste a URL, hover image to edit or remove */}
        <ImageSlot
          imageUrl={imageUrl}
          onUrlChange={onImageChange}
          className="w-16 h-16"
          alt={`${game.title} cover art`}
        />

        {/* Game title */}
        <p className="text-white text-sm font-medium leading-tight line-clamp-2">{game.title}</p>
      </div>

      {/* 3-dot options menu */}
      <button className="text-slate-600 hover:text-slate-400 transition-colors p-1 shrink-0">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5"  r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
    </div>

    {/* Bottom row: current price | historical low | action button */}
    <div className="flex items-end justify-between gap-2">

      {/* Current market price */}
      <div>
        <p className="text-slate-500 text-xs mb-0.5">Current Price</p>
        <p className="text-white font-semibold text-sm price-mono">${game.current.toFixed(2)}</p>
      </div>

      {/* All-time historical low for this game */}
      <div>
        <p className="text-slate-500 text-xs mb-0.5">Historical Low</p>
        <p className="text-[#4ecca3] font-semibold text-sm price-mono">${game.historical.toFixed(2)}</p>
      </div>

      {/* Buy = good time to purchase · Wait = hold off for a better deal */}
      {game.action === "Buy"
        ? <button className="btn-teal shrink-0">Buy</button>
        : <button className="btn-ghost shrink-0">Wait</button>
      }
    </div>

  </div>
);

export default PriceDropCard;
