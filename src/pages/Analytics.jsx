import StatisticsPanel from '../components/StatisticsPanel'
import ProgressRing from '../components/ProgressRing'
import { useState, useEffect } from 'react'
import './Analytics.css'

function Analytics() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const savedTasks = localStorage.getItem('nexusflow-tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const taskCompletionData = [
    { label: 'Completed', value: completedCount, color: '#00f3ff' },
    { label: 'Active', value: totalCount - completedCount, color: '#8b5cf6' },
  ]

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h2>Analytics & Insights</h2>
        <p>Track your productivity metrics and performance</p>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Overall Progress</h3>
          <div className="progress-display">
            <ProgressRing percentage={completionPercentage} size={150} />
          </div>
        </div>

        <div className="analytics-card">
          <h3>Task Statistics</h3>
          <StatisticsPanel tasks={tasks} />
        </div>

        <div className="analytics-card">
          <h3>Completion Rate</h3>
          <div className="completion-chart">
            {taskCompletionData.map((item, index) => (
              <div key={index} className="chart-item">
                <div className="chart-label">
                  <span className="chart-color" style={{ backgroundColor: item.color }}></span>
                  <span>{item.label}</span>
                </div>
                <div className="chart-bar">
                  <div
                    className="chart-fill"
                    style={{
                      width: `${totalCount > 0 ? (item.value / totalCount) * 100 : 0}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <div className="chart-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>Quick Stats</h3>
          <div className="quick-stats">
            <div className="stat-box">
              <div className="stat-number">{totalCount}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{completedCount}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{totalCount - completedCount}</div>
              <div className="stat-label">Remaining</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{tasks.filter((t) => t.priority === 'high').length}</div>
              <div className="stat-label">High Priority</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics

