import { useState } from "react";
import Navbar    from "./components/layout/Navbar.jsx";
import Sidebar   from "./components/layout/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";

/*
  App — root component
  Holds all global state and renders the full layout:

  ┌──────────────── Navbar ────────────────────────┐
  │ Sidebar │           page content               │
  └─────────┴────────────────────────────────────  ┘

  State:
    activeNav    — which sidebar item is highlighted
    selectedGame — which game the dashboard is analysing
    imageUrls    — one URL per image slot across the whole dashboard
                   key "hero" = hero card · keys 1-4 = price drop cards
*/
export default function App() {
  const [activeNav,    setActiveNav]    = useState("dashboard");
  const [selectedGame, setSelectedGame] = useState("Cyberpunk 2077");

  /* All image slots start empty — user pastes URLs at runtime */
  const [imageUrls, setImageUrls] = useState({ hero: "", 1: "", 2: "", 3: "", 4: "" });
  const setImageUrl = (key, url) => setImageUrls((prev) => ({ ...prev, [key]: url }));

  /* Render the correct page based on the active sidebar item */
  const renderPage = () => {
    switch (activeNav) {
      case "dashboard": return (
        <Dashboard
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          imageUrls={imageUrls}
          setImageUrl={setImageUrl}
        />
      );
      case "search":    return <BlankPage title="Search Games"  icon="🔍" />;
      case "analytics": return <BlankPage title="Analytics"     icon="📊" />;
      case "wishlist":  return <BlankPage title="My Wishlist"   icon="❤️" />;
      case "settings":  return <BlankPage title="Settings"      icon="⚙️" />;
      default:          return <BlankPage title="Not Found"     icon="🚫" />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0f1a] text-white overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active={activeNav} setActive={setActiveNav} />
        {renderPage()}
      </div>
    </div>
  );
}

/* Placeholder shown for sidebar pages that have no content yet */
const BlankPage = ({ title, icon }) => (
  <main className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-6">
    <span className="text-5xl">{icon}</span>
    <h2 className="text-white text-xl font-semibold">{title}</h2>
    <p className="text-slate-600 text-sm">This page is not built yet.</p>
  </main>
);
