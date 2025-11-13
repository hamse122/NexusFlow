// Enhanced: Improved empty state messaging with actionable guidance
// Enhanced: Added comprehensive drag-and-drop visual feedback system
// Enhanced: Implemented robust loading state handling with skeleton UI
// Enhanced: Added accessibility support and keyboard navigation
import { useState, useCallback } from 'react'
import TaskItem from './TaskItem'
import TaskListSkeleton from './TaskListSkeleton'
import './TaskList.css'

function TaskList({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  onUpdatePriority, 
  onMoveTask,
  isLoading = false,
  filter = 'all'
}) {
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [dragDirection, setDragDirection] = useState(null)

  const handleDragStart = useCallback((index) => {
    setDraggedIndex(index)
    // Set drag image for better visual feedback
    if (typeof window !== 'undefined' && window.DataTransfer?.setDragImage) {
      const dragImage = document.createElement('div')
      dragImage.className = 'drag-ghost'
      dragImage.textContent = 'Moving task...'
      document.body.appendChild(dragImage)
      e.dataTransfer.setDragImage(dragImage, 0, 0)
    }
  }, [])

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
      
      // Calculate drag direction for visual feedback
      const rect = e.currentTarget.getBoundingClientRect()
      const dragY = e.clientY - rect.top
      const isDraggingDown = draggedIndex < index
      const direction = dragY < rect.height / 2 ? 'above' : 'below'
      setDragDirection(direction)
    }
  }, [draggedIndex])

  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const adjustedIndex = dragDirection === 'above' && draggedIndex < dropIndex 
        ? dropIndex - 1 
        : dragDirection === 'below' && draggedIndex > dropIndex 
        ? dropIndex + 1 
        : dropIndex
      
      onMoveTask(draggedIndex, adjustedIndex)
    }
    handleDragEnd()
  }, [draggedIndex, dragDirection, onMoveTask])

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null)
    setDragOverIndex(null)
    setDragDirection(null)
    // Clean up drag ghost
    const ghost = document.querySelector('.drag-ghost')
    if (ghost) ghost.remove()
  }, [])

  const handleKeyDown = useCallback((e, index) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleDragStart(index)
    }
  }, [handleDragStart])

  // Loading state
  if (isLoading) {
    return <TaskListSkeleton count={5} />
  }

  // Empty state with contextual messaging
  if (tasks.length === 0) {
    const emptyStateMessages = {
      all: {
        icon: '📝',
        title: 'No tasks yet',
        message: 'Get started by creating your first task above!',
        tip: 'Tasks help you stay organized and focused.'
      },
      active: {
        icon: '✅',
        title: 'No active tasks',
        message: 'All tasks are completed! Great job! 🎉',
        tip: 'Add new tasks or review completed ones.'
      },
      completed: {
        icon: '⏳',
        title: 'No completed tasks',
        message: 'Tasks you complete will appear here.',
        tip: 'Stay productive and check off those tasks!'
      }
    }

    const { icon, title, message, tip } = emptyStateMessages[filter] || emptyStateMessages.all

    return (
      <div className="task-list-empty" role="status" aria-live="polite">
        <div className="empty-state-icon" aria-hidden="true">{icon}</div>
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-message">{message}</p>
        <p className="empty-state-tip">{tip}</p>
      </div>
    )
  }

  return (
    <div 
      className="task-list"
      role="list"
      aria-label="Task list"
    >
      {tasks.map((task, index) => (
        <div
          key={task.id}
          role="listitem"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          onKeyDown={(e) => handleKeyDown(e, index)}
          tabIndex={0}
          aria-grabbed={draggedIndex === index}
          className={`
            task-item-wrapper 
            ${draggedIndex === index ? 'dragging' : ''}
            ${dragOverIndex === index ? `drag-over drag-${dragDirection}` : ''}
            ${task.completed ? 'completed' : ''}
          `}
        >
          <div className="drag-handle" aria-label="Drag to reorder">
            ⋮⋮
          </div>
          
          <TaskItem
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onUpdatePriority={onUpdatePriority}
            isDragging={draggedIndex === index}
          />
          
          {dragOverIndex === index && (
            <div 
              className="drop-indicator"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
      
      {/* Drop zone for adding to end of list */}
      <div
        className={`task-list-drop-zone ${dragOverIndex === tasks.length ? 'active' : ''}`}
        onDragOver={(e) => handleDragOver(e, tasks.length)}
        onDrop={(e) => handleDrop(e, tasks.length)}
        aria-hidden="true"
      >
        Drop here to move to end
      </div>
    </div>
  )
}

export default TaskList
