import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// ⭐ NEW: Add global context provider (future-proofing)
import { ThemeProvider } from './context/ThemeContext'

// ⭐ NEW: Add error boundary support
import ErrorBoundary from './components/ErrorBoundary'

// ⭐ NEW: Add performance logger
import reportWebVitals from './reportWebVitals'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    {/* ⭐ NEW: Wrap app inside Error Boundary for safe crashes */}
    <ErrorBoundary>

      {/* ⭐ NEW: Wrap inside ThemeProvider for dark/light mode */}
      <ThemeProvider>
        <App />
      </ThemeProvider>

    </ErrorBoundary>

  </React.StrictMode>
)

// ⭐ NEW: Web performance metrics (optional but useful)
reportWebVitals()
