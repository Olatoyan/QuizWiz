import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-12 px-28">
      <h2 className="text-[4rem] text-primary  font-semibold">
        <button>QuizWiz</button>
      </h2>
      <nav>
        <NavList />
      </nav>
    </header>
  );
}

function NavList() {
  return (
    <ul className="flex items-center">
      <NavLinks>About us</NavLinks>
      <NavLinks>FAQs</NavLinks>
      <NavLinks>Contact us</NavLinks>
      <NavLinks>Sign up</NavLinks>
    </ul>
  );
}
