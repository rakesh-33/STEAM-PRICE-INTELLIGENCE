import { useState, useRef, useEffect } from "react";

/*
  ImageSlot — Reusable image slot with 3 states:
  ┌──────────────────────────────────────────────────┐
  │ EMPTY   → dashed border + link icon              │
  │           click anywhere to open the URL input   │
  │                                                  │
  │ EDITING → text input appears inside the slot     │
  │           Enter = save · Escape = cancel         │
  │                                                  │
  │ SHOWING → game cover renders                     │
  │           hover → Edit URL / Remove overlay      │
  └──────────────────────────────────────────────────┘

  Props:
    imageUrl    string    — current URL ("" = empty state)
    onUrlChange function  — called with the new URL on save, or "" on remove
    className   string    — Tailwind sizing, e.g. "w-36 h-28"
    alt         string    — alt text for the <img>
    rounded     string    — border-radius class, default "rounded-lg"
*/

const ImageSlot = ({
  imageUrl  = "",
  onUrlChange,
  className = "w-16 h-16",
  alt       = "Game cover",
  rounded   = "rounded-lg",
}) => {
  const [editing,  setEditing]  = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [imgError, setImgError] = useState(false);
  const inputRef = useRef(null);

  /* Auto-focus the URL input when editing opens */
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  /* Reset broken-image flag whenever a new URL arrives */
  useEffect(() => { setImgError(false); }, [imageUrl]);

  const openEditor = () => { setInputVal(imageUrl || ""); setEditing(true); setImgError(false); };
  const handleSave = () => { onUrlChange(inputVal.trim()); setEditing(false); setImgError(false); };
  const handleClear = (e) => { e.stopPropagation(); onUrlChange(""); setEditing(false); setImgError(false); };
  const handleKey   = (e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setEditing(false); };

  const base = `${className} ${rounded} shrink-0 overflow-hidden`;

  /* ── STATE 3: image is showing ── */
  if (imageUrl && !imgError) {
    return (
      <div className={`${base} relative group`}>
        {/* Game cover image — falls back to empty if URL is broken */}
        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" onError={() => setImgError(true)} />

        {/* Hover overlay — dims image and shows edit / remove buttons */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5">
          <button onClick={openEditor} className="flex items-center gap-1 px-2 py-1 bg-[#4ecca3] hover:bg-[#3db892] text-[#0e1420] text-[10px] font-bold rounded transition-colors">
            {/* Pencil icon */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            Edit URL
          </button>
          <button onClick={handleClear} className="flex items-center gap-1 px-2 py-1 bg-[#1a2332] hover:bg-[#223040] border border-[#2a3a50] text-slate-400 text-[10px] rounded transition-colors">
            {/* X icon */}
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            Remove
          </button>
        </div>
      </div>
    );
  }

  /* ── STATE 2: URL input is open ── */
  if (editing) {
    return (
      <div className={`${base} bg-[#1a2332] border-2 border-[#4ecca3] flex flex-col items-center justify-center p-2 gap-2`}>
        <input
          ref={inputRef}
          type="url"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKey}
          placeholder="https://..."
          className="w-full bg-[#0e1420] border border-[#2a3a50] rounded text-[10px] text-slate-300 px-2 py-1 focus:outline-none focus:border-[#4ecca3] placeholder-slate-600 transition-colors"
        />
        <div className="flex gap-1 w-full">
          <button onClick={handleSave}          className="flex-1 py-1 bg-[#4ecca3] hover:bg-[#3db892] text-[#0e1420] text-[10px] font-bold rounded transition-colors">Save</button>
          <button onClick={() => setEditing(false)} className="flex-1 py-1 bg-[#1a2332] hover:bg-[#223040] border border-[#2a3a50] text-slate-400 text-[10px] rounded transition-colors">Cancel</button>
        </div>
      </div>
    );
  }

  /* ── STATE 1: empty placeholder — click to add an image ── */
  return (
    <button
      onClick={openEditor}
      title="Click to paste an image URL"
      className={`${base} bg-[#1a2332] border border-dashed border-[#2a3a50] hover:border-[#4ecca3] hover:bg-[#1e2d40] flex flex-col items-center justify-center gap-1.5 text-slate-600 hover:text-[#4ecca3] transition-all duration-200 group`}
    >
      {/* Link icon */}
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      <span className="text-[9px] font-medium text-center px-1 hidden sm:block">Paste image URL</span>
    </button>
  );
};

export default ImageSlot;
