import { AsideHome } from "@/components/aside/__aside";

interface layoutHomeProps {
  children: React.ReactNode;
}

export default function LayoutHomeProps({ children }: layoutHomeProps) {
  return (
    <div className="flex ">
      <AsideHome />
      <div>{children}</div>
    </div>
  );
}
