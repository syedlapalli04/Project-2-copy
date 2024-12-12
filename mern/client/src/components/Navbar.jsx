import { NavLink } from "react-router-dom";

export default function Navbar({genres, onFilterChange}) {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/create">
          Create Book
        </NavLink>
        {/* DropwDown1*/}
        <select
          onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
          className="h-9 px-3 rounded-md border border-input bg-background text-md font-medium hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </nav>
    </div>
  );
}