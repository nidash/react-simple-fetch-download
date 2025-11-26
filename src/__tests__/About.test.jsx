import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import About from '../About'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

const sampleData = [
  { id: 1, userId: 1, title: 'Test Title', body: 'Test Body' },
  { id: 2, userId: 2, title: 'Second', body: 'Second Body' }
]

afterEach(() => {
  vi.restoreAllMocks()
})

test('loads and displays posts, download button triggers blob creation', async () => {
  // mock fetch
  vi.stubGlobal('fetch', () =>
    Promise.resolve({ ok: true, json: async () => sampleData })
  )

  // mock URL.createObjectURL / revoke
  const createObjectURL = vi.fn(() => 'blob:1')
  const revokeObjectURL = vi.fn()
  // stub the global URL object methods
  global.URL = { createObjectURL, revokeObjectURL }

  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  )

  // initially shows loading spinner
  expect(screen.getByLabelText(/Loading data/i)).toBeInTheDocument()

  // wait for a post title to appear after fetch resolves
  const firstTitle = await screen.findByText(/Test Title/i)
  expect(firstTitle).toBeInTheDocument()

  // download button should exist and be enabled
  const downloadBtn = screen.getByRole('button', { name: /Download all records as CSV/i })
  expect(downloadBtn).toBeEnabled()

  // click download and assert blob URL was created
  await userEvent.click(downloadBtn)
  expect(createObjectURL).toHaveBeenCalled()
})
