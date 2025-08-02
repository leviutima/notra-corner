interface ProfileIconUser {
  firstLetter: string | undefined;
  userName?: string | undefined;
  surname?: string | undefined;
}

export function ProfileIconUser({ firstLetter, userName, surname }: ProfileIconUser) {
  const findFirtLetter = firstLetter?.[0] ?? "";

  return (
    <div className="flex items-center gap-2">
      <div className="bg-red-600 px-3 py-1.5 rounded-md flex items-center justify-center">
        <span className="text-[13px] font-bold">{findFirtLetter}</span>
      </div>{" "}
      <span className="text-[15px] font-medium">{userName} {surname}</span>
    </div>
  );
}
