import Link from "next/link";
import { usePathname } from "next/navigation";

export function Menu() {
  const pathName = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-10">
        <li className="font-medium text-[16px] cursor-pointer">
          <Link
            href={"/"}
            className={`hover:underline ${
              pathName === "/" ? "underline font-semibold" : ""
            }`}
          >
            Início
          </Link>
        </li>
        <li className="font-medium text-[16px] cursor-pointer">
          {" "}
          <Link
            href={"/together"}
            className={`hover:underline ${
              pathName === "/together" ? "underline font-semibold" : ""
            }`}
          >
            Faça parte
          </Link>
        </li>
        <li className="font-medium text-[16px] cursor-pointer">
          {" "}
          <Link
            href={"/about"}
            className={`hover:underline ${
              pathName === "/about" ? "underline font-semibold" : ""
            }`}
          >
            Sobre 
          </Link>
        </li>
      </ul>
    </nav>
  );
}
