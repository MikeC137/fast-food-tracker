import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img className="h-24 md:h-30" src="/Logo.png" alt="Logo" />
    </Link>
  );
}

export default Logo;
