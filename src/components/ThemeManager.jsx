import { useState } from 'react'
import { saveThemes, loadThemes } from '../utils/themeUtils'
import '../styles/ThemeManager.css'

function ThemeManager({ theme, setTheme }) {
  const [themes, setThemes] = useState(loadThemes())
  const [themeName, setThemeName] = useState('')
  const [showManager, setShowManager] = useState(false)

  const saveCurrentTheme = () => {
    if (!themeName.trim()) {
      alert('Please enter a theme name')
      return
    }
    
    const newThemes = { ...themes, [themeName]: theme }
    setThemes(newThemes)
    saveThemes(newThemes)
    setThemeName('')
    alert(`Theme "${themeName}" saved!`)
  }

  const loadTheme = (name) => {
    setTheme(themes[name])
  }

  const deleteTheme = (name) => {
    if (confirm(`Delete "${name}" theme?`)) {
      const newThemes = { ...themes }
      delete newThemes[name]
      setThemes(newThemes)
      saveThemes(newThemes)
    }
  }

  return (
    <div className="theme-manager">
      <button 
        className="manager-trigger" 
        onClick={() => setShowManager(!showManager)}
        title="Manage saved themes"
      >
        💾 Manage Themes
      </button>

      {showManager && (
        <div className="manager-modal">
          <div className="manager-content">
            <div className="manager-header">
              <h3>💾 My Themes</h3>
              <button className="close-btn" onClick={() => setShowManager(false)}>✕</button>
            </div>

            <div className="save-section">
              <input
                type="text"
                placeholder="Enter theme name..."
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
                className="theme-name-input"
              />
              <button onClick={saveCurrentTheme} className="save-theme-btn">Save Theme</button>
            </div>

            <div className="themes-list">
              {Object.keys(themes).length === 0 ? (
                <p className="empty-message">No saved themes yet. Save your first theme!</p>
              ) : (
                Object.entries(themes).map(([name, themeData]) => (
                  <div key={name} className="theme-item">
                    <div className="theme-item-colors">
                      <div className="color-dot" style={{backgroundColor: themeData.primary}}></div>
                      <div className="color-dot" style={{backgroundColor: themeData.secondary}}></div>
                      <div className="color-dot" style={{backgroundColor: themeData.accent}}></div>
                    </div>
                    <span className="theme-item-name">{name}</span>
                    <div className="theme-item-actions">
                      <button 
                        onClick={() => loadTheme(name)}
                        className="load-btn"
                        title="Load this theme"
                      >
                        Load
                      </button>
                      <button 
                        onClick={() => deleteTheme(name)}
                        className="delete-btn"
                        title="Delete this theme"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeManager
