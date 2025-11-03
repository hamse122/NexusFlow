// Enhanced: Optimize StatisticsPanel calculation
// Enhanced: Optimize StatisticsPanel animation performance
import { useEffect, useState, useRef } from 'react'
import './StatisticsPanel.css'

function StatisticsPanel({ tasks }) {
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
    priority: 0,
  })

  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const active = tasks.filter((t) => !t.completed).length
  const priority = tasks.filter((t) => t.priority === 'high').length
  const statsRef = useRef(animatedStats)

  useEffect(() => {
    statsRef.current = animatedStats
  }, [animatedStats])

  useEffect(() => {
    const duration = 800
    const startTime = Date.now()
    const startStats = { ...statsRef.current }

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setAnimatedStats({
        total: Math.round(startStats.total + (total - startStats.total) * eased),
        completed: Math.round(startStats.completed + (completed - startStats.completed) * eased),
        active: Math.round(startStats.active + (active - startStats.active) * eased),
        priority: Math.round(startStats.priority + (priority - startStats.priority) * eased),
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [total, completed, active, priority])

  const maxValue = Math.max(total, completed, active, priority, 1)
  const totalWidth = total ? (total / maxValue) * 100 : 0
  const completedWidth = completed ? (completed / maxValue) * 100 : 0
  const activeWidth = active ? (active / maxValue) * 100 : 0
  const priorityWidth = priority ? (priority / maxValue) * 100 : 0

  return (
    <div className="statistics-panel">
      <h3 className="statistics-title">Statistics</h3>
      <div className="statistics-grid">
        <div className="stat-item">
          <div className="stat-label">Total Tasks</div>
          <div className="stat-bar-container">
            <div
              className="stat-bar stat-bar-total"
              style={{ width: `${totalWidth}%` }}
            />
          </div>
          <div className="stat-value">{animatedStats.total}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Completed</div>
          <div className="stat-bar-container">
            <div
              className="stat-bar stat-bar-completed"
              style={{ width: `${completedWidth}%` }}
            />
          </div>
          <div className="stat-value">{animatedStats.completed}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Active</div>
          <div className="stat-bar-container">
            <div
              className="stat-bar stat-bar-active"
              style={{ width: `${activeWidth}%` }}
            />
          </div>
          <div className="stat-value">{animatedStats.active}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Priority</div>
          <div className="stat-bar-container">
            <div
              className="stat-bar stat-bar-priority"
              style={{ width: `${priorityWidth}%` }}
            />
          </div>
          <div className="stat-value">{animatedStats.priority}</div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsPanel

