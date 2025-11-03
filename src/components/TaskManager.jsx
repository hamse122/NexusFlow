// Enhanced: Add code comments to TaskManager component
import { useState, useEffect } from 'react'
import TaskInput from './TaskInput'
import TaskList from './TaskList'
import ProgressRing from './ProgressRing'
import StatisticsPanel from './StatisticsPanel'
import FilterTabs from './FilterTabs'
import './TaskManager.css'

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  // Load tasks from local storage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('nexusflow-tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('nexusflow-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskText, priority = 'normal') => {
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText.trim(),
        completed: false,
        priority: priority,
        createdAt: new Date().toISOString(),
      }
      setTasks([...tasks, newTask])
    }
  }

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const updateTaskPriority = (taskId, priority) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, priority } : task
      )
    )
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed)
      case 'completed':
        return tasks.filter((task) => task.completed)
      case 'priority':
        return tasks.filter((task) => task.priority === 'high')
      default:
        return tasks
    }
  }

  const moveTask = (fromIndex, toIndex) => {
    const filteredTasks = getFilteredTasks()
    const newFilteredTasks = [...filteredTasks]
    const [removed] = newFilteredTasks.splice(fromIndex, 1)
    newFilteredTasks.splice(toIndex, 0, removed)
    
    // Map filtered tasks back to all tasks
    const taskIds = newFilteredTasks.map(t => t.id)
    const newTasks = [...tasks].sort((a, b) => {
      const aIndex = taskIds.indexOf(a.id)
      const bIndex = taskIds.indexOf(b.id)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
    
    setTasks(newTasks)
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const filteredTasks = getFilteredTasks()

  return (
    <div className="task-manager">
      <div className="task-manager-content">
        <header className="task-manager-header">
          <h1 className="nexusflow-title">
            <span className="title-gradient">Nexus</span>
            <span className="title-accent">Flow</span>
          </h1>
          <p className="task-manager-subtitle">Professional Task Management 2025</p>
        </header>

        <div className="dashboard-section">
          <div className="progress-section">
            <ProgressRing percentage={completionPercentage} />
          </div>
          <StatisticsPanel tasks={tasks} />
        </div>

        <TaskInput onAddTask={addTask} />

        <FilterTabs activeFilter={filter} onFilterChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onUpdatePriority={updateTaskPriority}
          onMoveTask={moveTask}
        />
      </div>
    </div>
  )
}

export default TaskManager

