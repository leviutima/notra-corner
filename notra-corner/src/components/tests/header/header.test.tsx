import { Header } from "@/components/header/header-LP/header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import darkLogo from "@/assets/logo-dark.png";

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
    expect(image).toHaveAttribute("src", darkLogo.src);
  });
});