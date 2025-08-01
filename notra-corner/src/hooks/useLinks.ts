import { RootState } from "@/store/store"
import { Label } from "@radix-ui/react-label"
import { Columns3, Timer } from "lucide-react"
import { useSelector } from "react-redux"

export const useLinks = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return [
    { href: `/home/${user?.id}`, label: "Quadro de tarefas" , icon: Columns3},
    // {href: `/pomodoro/${user?.id}`, label: "Pomodoro", icon: Timer}
    
  ]
}
