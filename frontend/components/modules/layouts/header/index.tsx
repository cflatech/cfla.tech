import Link from "next/link";
// eslint-disable-next-line import/no-extraneous-dependencies
// import { FaBars } from "react-icons/fa6";
import Logo from "./cflatech.svg";

export default function Header(): JSX.Element {
  return (
    <header className="bg-sub py-2 pl-2">
      <div className="flex items-center">
        {/* <div className="rounded-md border-0 border-solid border-main px-1 py-1">
          <FaBars size={30} />
        </div> */}
        <div className="px-3 py-3">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
}
