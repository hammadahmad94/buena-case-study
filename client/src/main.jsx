import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Premium Blue
    },
    background: {
      default: '#f8fafc', // Light gray/white
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Modern look
          borderRadius: 8
        }
      }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 12
            }
        }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
