import { render, screen } from '@testing-library/react'
import App from '../App'
import { MemoryRouter } from 'react-router-dom'

test('routes render Home by default', () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByText(/Welcome to My Page/i)).toBeInTheDocument()
})
