import Link from "next/link";
import { Button } from "../ui/button";

export function MenuButtons() {
  return (
    <div className="flex items-center gap-10">
      <div className="cursor-pointer">Login</div>
      <Link href={"/auth/sign-up"}>
        <Button className="cursor-pointer">Comece agora</Button>
      </Link>
    </div>
  );
}
