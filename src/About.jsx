import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Container, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'

export default function About() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  // Pagination calculations
  const recordsPerPage = 5
  const totalPages = Math.ceil(data.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentRecords = data.slice(startIndex, endIndex)

  // Download CSV function
  const downloadCSV = () => {
    // Create CSV header
    const headers = ['ID', 'User ID', 'Title', 'Body']
    const csvContent = [
      headers.join(','),
      ...data.map(post => [
        post.id,
        post.userId,
        `"${post.title}"`,
        `"${post.body}"`
      ].join(','))
    ].join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'posts.csv'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Website
          </Typography>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ marginRight: 2 }}>
              Home
            </Button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ marginRight: 2 }}>
              About
            </Button>
          </Link>
          <Button color="inherit">
            Contact
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, paddingY: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4, lineHeight: 1.6 }}>
          This is the about page. You can add information about your company, team, or project here.
        </Typography>

        {/* Loading and Error States */}
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error: {error}</Typography>}

        {/* Table */}
        {!loading && !error && (
          <>
            {/* Download Button */}
            <Box sx={{ marginBottom: 2 }}>
              <Button variant="contained" color="primary" onClick={downloadCSV}>
                Download All Records
              </Button>
            </Box>

            {/* Table Container */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>User ID</strong></TableCell>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Body</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRecords.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.id}</TableCell>
                      <TableCell>{post.userId}</TableCell>
                      <TableCell>{post.title}</TableCell>
                      <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.body}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
              />
            </Box>
          </>
        )}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #e0e0e0',
          paddingY: 3,
          marginTop: 'auto'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="body2" color="textSecondary" align="center">
            © 2024 My Website. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}