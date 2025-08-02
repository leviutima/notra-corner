import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MenuButtons() {
  return (
    <div className="flex items-center gap-10">
      <Link href={"/auth/sign-in"}>
        <div className="cursor-pointer">Login</div>
      </Link>

      <Link href={"/auth/sign-up"}>
        <Button className="cursor-pointer">Comece agora</Button>
      </Link>
    </div>
  );
}
