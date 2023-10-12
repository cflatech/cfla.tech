import Link from "next/link";
import Logo from "./cflatech.svg";

export default function Header(): JSX.Element {
  return (
    <header className="bg-sub py-5 pl-5">
      <Link href="/">
        <Logo />
      </Link>
    </header>
  );
}
