import { AsideHome } from "@/components/aside/__aside";

interface layoutHomeProps {
  children: React.ReactNode;
}

export default function LayoutHomeProps({ children }: layoutHomeProps) {
  return (
    <div className="flex h-screen">
      <AsideHome />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
