/* ── Top navigation bar ── */
const Navbar = () => (
  <header className="h-14 bg-[#0e1420] border-b border-[#1e2a3a] flex items-center px-6 gap-4 shrink-0 z-10">

    {/* Logo + platform name */}
    <div className="flex items-center gap-2 mr-4">
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#1b2838" stroke="#4ecca3" strokeWidth="1.5" />
        <path d="M10 22 C10 22 13 18 16 16 C19 14 22 14 22 10" stroke="#4ecca3" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="16" cy="16" r="3" fill="#4ecca3" opacity="0.6" />
      </svg>
      <span className="text-white font-semibold text-sm tracking-wide whitespace-nowrap">
        Steam Price Intelligence Platform
      </span>
    </div>

    {/* Search bar */}
    <div className="flex-1 max-w-sm relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search for Games"
        className="input-steam w-full pl-9 pr-4 py-2"
      />
    </div>

    {/* Spacer */}
    <div className="flex-1" />

    {/* Notification bell with unread dot */}
    <button className="relative p-2 rounded-md hover:bg-[#1a2332] transition-colors">
      <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span className="absolute top-1 right-1 w-2 h-2 bg-[#4ecca3] rounded-full" />
    </button>

    {/* User avatar */}
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0e1420] shrink-0 cursor-pointer"
      style={{ background: "linear-gradient(135deg, #4ecca3, #2d9cdb)" }}
    >
      U
    </div>

  </header>
);

export default Navbar;
