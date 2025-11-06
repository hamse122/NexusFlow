// Enhanced: Add error boundary placeholder comments
import { useState } from 'react'
import NavigationBar from './components/NavigationBar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import ParticleBackground from './components/ParticleBackground'
import './App.css'



  return (
    <div className="app">
      <ParticleBackground />
      <NavigationBar activePage={activePage} onPageChange={setActivePage} />
      <div className="app-content">
        {renderPage()}
      </div>
    </div>
  )
}

export default App

