import { useEffect, useState } from 'react'
import './ProgressRing.css'

function ProgressRing({ percentage, size = 120 }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  useEffect(() => {
    const duration = 1000
    const startTime = Date.now()
    const startPercentage = animatedPercentage

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = startPercentage + (percentage - startPercentage) * eased

      setAnimatedPercentage(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [percentage])

  return (
    <div className="progress-ring-container">
      <svg className="progress-ring" width={size} height={size}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F3FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <circle
          className="progress-ring-background"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="8"
        />
        <circle
          className="progress-ring-foreground"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring-text">
        <span className="progress-ring-percentage">{Math.round(animatedPercentage)}%</span>
        <span className="progress-ring-label">Complete</span>
      </div>
    </div>
  )
}

export default ProgressRing

