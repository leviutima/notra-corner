import { AsideResponsive } from "@/components/aside/responsive/__aside-resposive";
import { FooterHome } from "@/components/footer/footer-home/footer-home";
import { HeaderHome } from "@/components/header/header-home/__header";

interface LayoutHomeProps {
  children: React.ReactNode;
}

export default function LayoutHome({ children }: LayoutHomeProps) {
  return (
    <div className="flex h-screen flex-col">
      <div className="hidden md:block">
        <HeaderHome />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
      <div className="flex justify-center">
        <FooterHome />
      </div>
    </div>
  );
}
