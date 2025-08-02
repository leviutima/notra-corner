import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface ProfileIconUser {
  firstLetter: string | undefined;
}

export function ProfileIconUser({ firstLetter }: ProfileIconUser) {
  const findFirtLetter = firstLetter?.[0] ?? "";

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <div className="bg-red-600 px-3 py-1.5 rounded-md flex items-center justify-center cursor-pointer">
            <span className="text-[13px] font-bold">{findFirtLetter}</span>
          </div>{" "}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            {" "}
            <User /> Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut /> Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
