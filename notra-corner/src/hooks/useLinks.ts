import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

export const useLinks = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return [
    { href: `/home/${user?.id}`, label: "Quadro de tarefas" },
  ]
}
