import '@testing-library/jest-dom'
import { Header } from '@/components/header/header'
import { render, screen } from '@testing-library/react'

describe('Header', () => {
  it('deve renderizar o título "NC"', () => {
    render(<Header />)

    const titleElement = screen.getByText('NC')
    expect(titleElement).toBeInTheDocument()
  })

})
