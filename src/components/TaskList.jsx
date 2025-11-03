import { useState } from 'react'
import TaskItem from './TaskItem'
import './TaskList.css'

function TaskList({ tasks, onToggleTask, onDeleteTask, onUpdatePriority, onMoveTask }) {
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  const handleDragStart = (index) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onMoveTask(draggedIndex, dropIndex)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-state-icon">✨</div>
        <p>No tasks yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`task-item-wrapper ${
            draggedIndex === index ? 'dragging' : ''
          } ${dragOverIndex === index ? 'drag-over' : ''}`}
        >
          <TaskItem
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onUpdatePriority={onUpdatePriority}
          />
        </div>
      ))}
    </div>
  )
}

export default TaskList

