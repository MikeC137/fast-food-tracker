import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className="bg-zinc-800 px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Logo />
        <ul className="md:flex flex items-center gap-4 text-zinc-300 font-['Inter',sans-serif]">
          <li
            className={
              "bg-blue-600 hover:bg-blue-800 p-2 rounded-lg transition-colors"
            }
          >
            <NavLink to="/dashboard">DASHBOARD</NavLink>
          </li>
          <li className={"hover:bg-green-700 p-2 rounded-lg transition-colors"}>
            <NavLink to="/history">HISTORY</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PageNav;
