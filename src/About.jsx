import { useState, useEffect, useMemo, useCallback } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Pagination,
    Tooltip
} from '@mui/material'
import { Link } from 'react-router-dom'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'
const RECORDS_PER_PAGE = 5

export default function About() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const controller = new AbortController()
        const load = async () => {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch(API_URL, { signal: controller.signal })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const json = await res.json()
                setData(json)
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message || 'Unknown error')
            } finally {
                setLoading(false)
            }
        }
        load()
        return () => controller.abort()
    }, [])

    // Pagination calculations memoized
    const { totalPages, currentRecords } = useMemo(() => {
        const total = Math.max(0, Math.ceil(data.length / RECORDS_PER_PAGE))
        const start = (currentPage - 1) * RECORDS_PER_PAGE
        const current = data.slice(start, start + RECORDS_PER_PAGE)
        return { totalPages: total, currentRecords: current }
    }, [data, currentPage])

    // Clamp page when data changes
    useEffect(() => {
        if (totalPages === 0) {
            setCurrentPage(1)
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [totalPages, currentPage])

    // CSV helper (escape quotes by doubling)
    const csvEscape = (val) => {
        const s = val == null ? '' : String(val)
        return `"${s.replace(/"/g, '""')}"`
    }

    const downloadCSV = useCallback(() => {
        if (!data.length) return
        const headers = ['ID', 'User ID', 'Title', 'Body']
        const rows = data.map(p => [p.id, p.userId, p.title, p.body].map(csvEscape).join(','))
        const csv = [headers.join(','), ...rows].join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `posts_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    }, [data])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Website
                    </Typography>
                    <Button component={Link} to="/" color="inherit" sx={{ mr: 2 }}>
                        Home
                    </Button>
                    <Button component={Link} to="/about" color="inherit" sx={{ mr: 2 }}>
                        About
                    </Button>
                    <Button color="inherit">Contact</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    About Us
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6 }}>
                    This is the about page. You can add information about your company, team, or project here.
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                        <CircularProgress aria-label="Loading data" />
                    </Box>
                ) : error ? (
                    <Typography color="error">Error: {error}</Typography>
                ) : data.length === 0 ? (
                    <Typography>No records available.</Typography>
                ) : (
                    <>
                        <Box sx={{ mb: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={downloadCSV}
                                disabled={data.length === 0}
                                aria-label="Download all records as CSV"
                            >
                                Download All Records
                            </Button>
                        </Box>

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
                                        <TableRow key={post.id} hover>
                                            <TableCell>{post.id}</TableCell>
                                            <TableCell>{post.userId}</TableCell>
                                            <TableCell>{post.title}</TableCell>
                                            <TableCell sx={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <Tooltip title={post.body} placement="top">
                                                    <span>{post.body}</span>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={(_, page) => setCurrentPage(page)}
                                    color="primary"
                                    aria-label="Posts pagination"
                                />
                            </Box>
                        )}
                    </>
                )}
            </Container>

            <Box
                component="footer"
                sx={{
                    backgroundColor: '#f5f5f5',
                    borderTop: '1px solid #e0e0e0',
                    py: 3,
                    mt: 'auto'
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