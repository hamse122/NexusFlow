import './Settings.css'

function Settings() {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Customize your NexusFlow experience</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="settings-group">
            <label className="setting-item">
              <span className="setting-label">Theme</span>
              <select className="setting-control">
                <option>Dark (Default)</option>
                <option>Auto</option>
              </select>
            </label>
            <label className="setting-item">
              <span className="setting-label">Accent Color</span>
              <div className="color-options">
                <button className="color-option active" style={{ backgroundColor: '#00f3ff' }}></button>
                <button className="color-option" style={{ backgroundColor: '#8b5cf6' }}></button>
                <button className="color-option" style={{ backgroundColor: '#ff6b9d' }}></button>
                <button className="color-option" style={{ backgroundColor: '#00d4aa' }}></button>
              </div>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="settings-group">
            <label className="setting-item toggle">
              <span className="setting-label">Task Reminders</span>
              <input type="checkbox" className="setting-toggle" defaultChecked />
            </label>
            <label className="setting-item toggle">
              <span className="setting-label">Daily Summary</span>
              <input type="checkbox" className="setting-toggle" />
            </label>
            <label className="setting-item toggle">
              <span className="setting-label">Achievement Badges</span>
              <input type="checkbox" className="setting-toggle" defaultChecked />
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Data Management</h3>
          <div className="settings-group">
            <button className="settings-button">Export Tasks</button>
            <button className="settings-button">Import Tasks</button>
            <button className="settings-button danger">Clear All Data</button>
          </div>
        </div>

        <div className="settings-section">
          <h3>About</h3>
          <div className="settings-group">
            <div className="about-info">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Build:</strong> 2025.01</p>
              <p><strong>License:</strong> MIT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

