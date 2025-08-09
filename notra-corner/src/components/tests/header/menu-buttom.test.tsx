import { MenuButtons } from "@/components/header/header-LP/menu-buttons"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";

jest.mock('next/link',() => {
  return ({children, href}: any) => <a href={href}>{children}</a>
})

describe('Menu buttons header',() => {
  it('Should click redirect sign-in page', () => {
    render(<MenuButtons />)
    const linkElement = screen.getByRole("link", {name:/login/i})
    expect(linkElement).toHaveAttribute('href', "/auth/sign-in")
  }),

  it("Should click redirect sign-up page", () => {
    render(<MenuButtons />)
    const linkElement = screen.getByRole("link", {name:/Comece agora/i})
    expect(linkElement).toHaveAttribute('href', "/auth/sign-up")
  })
})