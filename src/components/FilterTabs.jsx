import './FilterTabs.css'

function FilterTabs({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'priority', label: 'Priority' },
  ]

  return (
    <div className="filter-tabs">
      <div className="filter-tabs-container">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
        <div
          className="filter-tab-slider"
          style={{
            transform: `translateX(${filters.findIndex((f) => f.id === activeFilter) * 100}%)`,
          }}
        />
      </div>
    </div>
  )
}

export default FilterTabs

