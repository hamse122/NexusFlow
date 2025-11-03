import TaskInput from '../components/TaskInput'
import TaskList from '../components/TaskList'
import FilterTabs from '../components/FilterTabs'
import { useState, useEffect } from 'react'
import './Tasks.css'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const savedTasks = localStorage.getItem('nexusflow-tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

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

  const filteredTasks = getFilteredTasks()

  return (
    <div className="tasks-page">
      <div className="tasks-page-header">
        <h2>Task Management</h2>
        <p>Organize and track your tasks efficiently</p>
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
  )
}

export default Tasks

