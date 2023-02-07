import React from 'react'
import Navigation from './Navigation'
import { Box } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'

const Layout = ({ children, user, handleLogout }) => {

  const theme = createTheme({
    palette: {
      mode: 'light',

      neutral: {
        main: '#fff',
        contrastText: '#000',
      },
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Box className='layout-component'>
      <CssBaseline />
        <Navigation user={user} logoutUser={handleLogout} />
        <Box component='main' className='main-component-wrapper' sx={{
          pt: 12,
          pb: 4,
          minHeight: '100vh',
          bgcolor: '#eceef4'
        }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout;