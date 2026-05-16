import { gameOptions } from "../../data/mockData.js";

/* Dropdown in the page header — switches which game is being analysed */
const GameSelector = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="input-steam px-4 py-2 font-medium min-w-[200px] cursor-pointer"
  >
    {gameOptions.map((game) => (
      <option key={game} value={game}>{game}</option>
    ))}
  </select>
);

export default GameSelector;
