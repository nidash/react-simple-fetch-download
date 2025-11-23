import { AppBar, Toolbar, Typography, Container, Box, Button, Card, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Home() {
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
      <Container maxWidth="md" sx={{ flexGrow: 1, paddingY: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
          Welcome to My Page
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4, lineHeight: 1.6 }}>
          This is a sample page built with Material UI and React. You can customize this content as needed.
        </Typography>

        {/* Sample Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, marginBottom: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Feature One
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Description of your first feature goes here.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Feature Two
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Description of your second feature goes here.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Feature Three
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Description of your third feature goes here.
              </Typography>
            </CardContent>
          </Card>
        </Box>
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
