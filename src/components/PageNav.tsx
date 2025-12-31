import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className="bg-zinc-800 px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Logo />
        <ul className="md:flex flex items-center gap-4 text-zinc-300 font-['Inter',sans-serif]">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `hover:text-white px-3 py-2 md:px-6 md:py-3 rounded-lg transition-colors ${
                  isActive ? "text-white bg-blue-600" : "text-zinc-300"
                }`
              }
            >
              DASHBOARD
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `hover:text-white px-3 py-2 md:px-6 md:py-3 rounded-lg transition-colors ${
                  isActive ? "text-white bg-blue-600" : "text-zinc-300"
                }`
              }
            >
              HISTORY
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PageNav;
