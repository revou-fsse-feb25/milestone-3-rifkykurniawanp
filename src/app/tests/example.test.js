import { render, screen } from '@testing-library/react'
import Button from '../tests/button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  const button = screen.getByText('Click me')
  expect(button).toBeInTheDocument()
})