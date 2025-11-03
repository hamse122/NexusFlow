import { useState } from 'react'
import './NavigationBar.css'

function NavigationBar({ activePage, onPageChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  const handleNavClick = (pageId) => {
    onPageChange(pageId)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => handleNavClick('dashboard')}>
          <span className="brand-icon">⚡</span>
          <span className="brand-text">
            <span className="brand-gradient">Nexus</span>
            <span className="brand-accent">Flow</span>
          </span>
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
      <div className="nav-indicator" style={{ left: `${navItems.findIndex(item => item.id === activePage) * 100}%` }} />
    </nav>
  )
}

export default NavigationBar

