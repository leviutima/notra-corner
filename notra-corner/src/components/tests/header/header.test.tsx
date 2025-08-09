import { Header } from "@/components/header/header-LP/header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import logo from "@/assets/logo-white.png";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    const srcString = typeof src === "string" ? src : src?.src || "";
    return <img src={srcString} alt={alt} {...rest} />;
  },
}));

describe("Header", () => {
  it("should render img with src and alt correctly", () => {
    render(<Header />);

    const image = screen.getByAltText("Logo notra-corner");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", logo.src);
  });

  it("shold render menu-inicio the header", () => {
    render(<Header />);

    expect(screen.getByText("Início")).toBeInTheDocument();
  });

  it("shold render menu-planos the header", () => {
    render(<Header />);

    expect(screen.getByText("Planos")).toBeInTheDocument();
  });

  it("shold render menu-sobre-nós the header", () => {
    render(<Header />);

    expect(screen.getByText("Sobre nós")).toBeInTheDocument();
  });

    it("shold render menu-contato the header", () => {
    render(<Header />);

    expect(screen.getByText("Contato")).toBeInTheDocument();
  });

  it("should render Login Button the header", () => {
    render(<Header />);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shoul render Sign-up button the header", () => {
    render(<Header />);

    expect(screen.getByText("Comece agora")).toBeInTheDocument();
  });
});
