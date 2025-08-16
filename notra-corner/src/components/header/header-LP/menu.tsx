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
        <li className="font-medium text-[16px] cursor-pointer">          <Link
            href={"/planos"}
            className={`hover:underline ${
              pathName === "/planos" ? "underline font-semibold" : ""
            }`}
          >
            Planos
          </Link></li>
        <li className="font-medium text-[16px] cursor-pointer">Sobre nós</li>
        <li className="font-medium text-[16px] cursor-pointer">Contato</li>
      </ul>
    </nav>
  );
}
