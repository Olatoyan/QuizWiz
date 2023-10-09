import { Link } from "react-router-dom";

export default function NavLinks({ children }) {
  return (
    <li>
      <Link className="text-[1.6rem] py-4 px-8" to="/">
        {children}
      </Link>
    </li>
  );
}
