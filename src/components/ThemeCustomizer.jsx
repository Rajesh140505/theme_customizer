import { useState } from 'react'
import { THEME_PRESETS, DEFAULT_THEME } from '../utils/themeUtils'
import ThemeManager from './ThemeManager'
import AdvancedTools from './AdvancedTools'
import '../styles/ThemeCustomizer.css'

function ThemeCustomizer({ theme, setTheme, undo, redo, canUndo, canRedo }) {
  const [copied, setCopied] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleColorChange = (key, value) => {
    setTheme({ ...theme, [key]: value })
  }

  const handlePresetClick = (preset) => {
    const presetTheme = { ...preset }
    delete presetTheme.name
    setTheme(presetTheme)
  }

  const handleReset = () => {
    setTheme(DEFAULT_THEME)
  }

  const copyToClipboard = (key, value) => {
    navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const colorKeys = [
    { key: 'primary', label: '🎨 Primary' },
    { key: 'secondary', label: '✨ Secondary' },
    { key: 'accent', label: '🌟 Accent' },
    { key: 'background', label: '🌑 Background' },
    { key: 'surface', label: '📦 Surface' },
    { key: 'text', label: '📝 Text' },
    { key: 'textMuted', label: '🔇 Text Muted' },
    { key: 'border', label: '🎀 Border' },
    { key: 'success', label: '✅ Success' },
    { key: 'warning', label: '⚠️ Warning' },
    { key: 'error', label: '❌ Error' },
  ]

  return (
    <div className="theme-customizer">
      <div className="customizer-card">
        <h2>🎨 Customize Colors</h2>
        
        <div className="color-grid">
          {colorKeys.map(({ key, label }) => (
            <div key={key} className="color-picker-group">
              <label htmlFor={key}>{label}</label>
              <div className="color-input-wrapper">
                <input
                  id={key}
                  type="color"
                  value={theme[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="color-input"
                />
                <div className="color-display" style={{ backgroundColor: theme[key] }}></div>
              </div>
              <div className="color-value">
                <code>{theme[key]}</code>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(key, theme[key])}
                  title="Copy color code"
                >
                  {copied === key ? '✓' : '📋'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="customizer-card themes-section">
        <h2>🎭 Presets</h2>
        <div className="presets-grid">
          {Object.entries(THEME_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              className="preset-btn"
              onClick={() => handlePresetClick(preset)}
              title={preset.name}
            >
              <div className="preset-colors">
                <div className="preset-color" style={{ backgroundColor: preset.primary }}></div>
                <div className="preset-color" style={{ backgroundColor: preset.secondary }}></div>
                <div className="preset-color" style={{ backgroundColor: preset.accent }}></div>
              </div>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <div className="history-buttons">
          <button 
            className="undo-btn" 
            onClick={undo}
            disabled={!canUndo}
            title="Undo previous change"
          >
            ↶ Undo
          </button>
          <button 
            className="redo-btn" 
            onClick={redo}
            disabled={!canRedo}
            title="Redo next change"
          >
            ↷ Redo
          </button>
        </div>
        <button className="reset-btn" onClick={handleReset}>
          🔄 Reset to Default
        </button>
        <button className="export-btn" onClick={() => {
          const json = JSON.stringify(theme, null, 2)
          navigator.clipboard.writeText(json)
          alert('Theme configuration copied to clipboard!')
        }}>
          📤 Export Theme
        </button>
      </div>

      <ThemeManager theme={theme} setTheme={setTheme} />

      <div className="advanced-section">
        <button 
          className="advanced-toggle"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? '⬆️ Hide' : '⬇️ Show'} Advanced Tools
        </button>
        {showAdvanced && <AdvancedTools theme={theme} setTheme={setTheme} />}
      </div>
    </div>
  )
}

export default ThemeCustomizer
