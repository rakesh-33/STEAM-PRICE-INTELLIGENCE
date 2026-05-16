/* ── Left navigation sidebar ── */

/* Nav items — id matches the activeNav state in App.jsx */
const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth={1.8}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "wishlist",
    label: "My Wishlist",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth={1.8}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const Sidebar = ({ active, setActive }) => (
  <aside className="w-52 bg-[#0c1119] border-r border-[#1e2a3a] flex flex-col py-4 shrink-0">

    {/* Main nav buttons — highlights the active one in teal */}
    <nav className="flex-1 px-3 space-y-1">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`nav-item ${active === item.id ? "nav-item-active" : ""}`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>

    {/* Settings — pinned to the bottom, separated by a border */}
    <div className="px-3 border-t border-[#1e2a3a] pt-3">
      <button className="nav-item" onClick={() => setActive("settings")}>
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        Settings
      </button>
    </div>

  </aside>
);

export default Sidebar;
