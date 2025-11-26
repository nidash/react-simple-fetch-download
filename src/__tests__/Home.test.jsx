import { render, screen } from '@testing-library/react'
import Home from '../Home'
import { MemoryRouter } from 'react-router-dom'

test('renders Home page content', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )

  expect(screen.getByText(/Welcome to My Page/i)).toBeInTheDocument()
})
