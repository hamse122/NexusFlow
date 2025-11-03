import { useState } from 'react'
import './TaskInput.css'

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [priority, setPriority] = useState('normal')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAddTask(inputValue, priority)
      setInputValue('')
      setPriority('normal')
      setIsExpanded(false)
    }
  }

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleBlur = () => {
    if (!inputValue.trim()) {
      setIsExpanded(false)
    }
  }

  return (
    <form
      className={`task-input ${isExpanded ? 'expanded' : ''}`}
      onSubmit={handleSubmit}
    >
      <div className="task-input-wrapper">
        <input
          type="text"
          className="task-input-field"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className={`task-input-options ${isExpanded ? 'visible' : ''}`}>
          <div className="priority-selector">
            <span className="priority-label">Priority:</span>
            {['low', 'normal', 'high'].map((p) => (
              <button
                key={p}
                type="button"
                className={`priority-button ${priority === p ? 'active' : ''}`}
                onClick={() => setPriority(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button type="submit" className="task-input-button">
        <span>Add</span>
      </button>
    </form>
  )
}

export default TaskInput

