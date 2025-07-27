import { AsideHome } from "@/components/aside/__aside";
import { AsideResponsive } from "@/components/aside/responsive/__aside-resposive";

interface LayoutHomeProps {
  children: React.ReactNode;
}

export default function LayoutHomeProps({ children }: LayoutHomeProps) {
  return (
    <div className="flex h-screen flex-col-reverse md:flex-row">
      <div className="hidden md:block">
        <AsideHome />
      </div>
      <div className="block md:hidden">
        <AsideResponsive />
      </div>

      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}