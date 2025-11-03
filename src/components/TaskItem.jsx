// Enhanced: Add type safety comments for task objects
import { useState } from 'react'
import './TaskItem.css'

function TaskItem({ task, onToggle, onDelete, onUpdatePriority }) {
  const [showRipple, setShowRipple] = useState(false)

  const handleCheckboxChange = () => {
    setShowRipple(true)
    setTimeout(() => setShowRipple(false), 600)
    onToggle(task.id)
  }

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return '#ff4757'
      case 'normal':
        return '#ffa726'
      case 'low':
        return '#66bb6a'
      default:
        return 'transparent'
    }
  }

  const isOverdue = () => {
    if (!task.createdAt || task.completed) return false
    const created = new Date(task.createdAt)
    const daysSince = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince > 7 && task.priority === 'high'
  }

  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''} ${
        isOverdue() ? 'overdue' : ''
      }`}
      style={{
        borderLeft: `3px solid ${getPriorityColor()}`,
      }}
    >
      <div className="task-item-content">
        <label className="task-item-checkbox">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleCheckboxChange}
              className="task-checkbox-input"
            />
            <span className="custom-checkbox">
              {task.completed && (
                <svg
                  className="checkmark"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            {showRipple && <span className="ripple-effect" />}
          </div>
          <span className="task-item-text">{task.text}</span>
        </label>
        <div className="task-item-actions">
          <select
            className="task-priority-select"
            value={task.priority}
            onChange={(e) => onUpdatePriority(task.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
          <button
            className="task-item-delete"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem

