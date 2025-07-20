interface ProfileIconUser {
  firstLetter: string | undefined
}

export function ProfileIconUser({firstLetter}: ProfileIconUser) {

  const findFirtLetter = firstLetter?.[0] ?? ""

  return(
    <div>
      {findFirtLetter}
    </div>
  )
}