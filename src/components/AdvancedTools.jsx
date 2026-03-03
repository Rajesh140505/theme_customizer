import { useState } from 'react'
import { generateRandomTheme, exportThemeAsCSS, getHarmonyColors, getContrastRatio, getWCAGLevel } from '../utils/themeUtils'
import '../styles/AdvancedTools.css'

function AdvancedTools({ theme, setTheme }) {
  const [activeTab, setActiveTab] = useState('harmony')
  const [selectedColor, setSelectedColor] = useState('primary')

  const handleRandomTheme = () => {
    const randomTheme = generateRandomTheme()
    setTheme(randomTheme)
  }

  const handleExportCSS = () => {
    exportThemeAsCSS(theme, 'my-theme')
  }

  const getHarmony = () => {
    return getHarmonyColors(theme[selectedColor])
  }

  const colorKeys = [
    'primary', 'secondary', 'accent', 'background', 'surface', 'text'
  ]

  return (
    <div className="advanced-tools">
      <h2>🚀 Advanced Tools</h2>
      
      <div className="tools-tabs">
        <button 
          className={`tab-btn ${activeTab === 'harmony' ? 'active' : ''}`}
          onClick={() => setActiveTab('harmony')}
        >
          🎨 Harmony
        </button>
        <button 
          className={`tab-btn ${activeTab === 'accessibility' ? 'active' : ''}`}
          onClick={() => setActiveTab('accessibility')}
        >
          ♿ Accessibility
        </button>
        <button 
          className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          📥 Export
        </button>
      </div>

      <div className="tools-content">
        {/* Harmony Tab */}
        {activeTab === 'harmony' && (
          <div className="tool-panel">
            <p>Get complementary color suggestions</p>
            <select 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value)}
              className="color-select"
            >
              {colorKeys.map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>

            <div className="harmony-result">
              <h4>Triadic Harmony</h4>
              {getHarmony() && (
                <div className="harmony-colors">
                  <div className="harmony-item">
                    <div className="harmony-color" style={{backgroundColor: getHarmony().original}}></div>
                    <label>Original</label>
                    <code>{getHarmony().original}</code>
                  </div>
                  <div className="harmony-item">
                    <div className="harmony-color" style={{backgroundColor: getHarmony().triadic1}}></div>
                    <label>Triadic 1</label>
                    <code>{getHarmony().triadic1}</code>
                  </div>
                  <div className="harmony-item">
                    <div className="harmony-color" style={{backgroundColor: getHarmony().triadic2}}></div>
                    <label>Triadic 2</label>
                    <code>{getHarmony().triadic2}</code>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Accessibility Tab */}
        {activeTab === 'accessibility' && (
          <div className="tool-panel">
            <p>Check WCAG contrast ratios for readability</p>
            
            <div className="accessibility-checks">
              <div className="contrast-check">
                <h4>Text on Background Contrast</h4>
                <div className="contrast-preview" style={{backgroundColor: theme.background, color: theme.text}}>
                  Sample text on background
                </div>
                {(() => {
                  const ratio = getContrastRatio(theme.background, theme.text)
                  const wcag = getWCAGLevel(ratio)
                  return (
                    <div className="contrast-result">
                      <div style={{color: wcag.color}}>
                        <strong>Ratio: {ratio}:1</strong><br/>
                        {wcag.text}
                      </div>
                    </div>
                  )
                })()}
              </div>

              <div className="contrast-check">
                <h4>Primary Button Contrast</h4>
                <div className="contrast-preview" style={{backgroundColor: theme.primary, color: 'white'}}>
                  Primary Button Text
                </div>
                {(() => {
                  const ratio = getContrastRatio(theme.primary, '#ffffff')
                  const wcag = getWCAGLevel(ratio)
                  return (
                    <div className="contrast-result">
                      <div style={{color: wcag.color}}>
                        <strong>Ratio: {ratio}:1</strong><br/>
                        {wcag.text}
                      </div>
                    </div>
                  )
                })()}
              </div>

              <div className="contrast-check">
                <h4>Success Alert Contrast</h4>
                <div className="contrast-preview" style={{backgroundColor: theme.success, color: 'white'}}>
                  Success Message
                </div>
                {(() => {
                  const ratio = getContrastRatio(theme.success, '#ffffff')
                  const wcag = getWCAGLevel(ratio)
                  return (
                    <div className="contrast-result">
                      <div style={{color: wcag.color}}>
                        <strong>Ratio: {ratio}:1</strong><br/>
                        {wcag.text}
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="tool-panel">
            <p>Export your theme in different formats</p>
            
            <div className="export-options">
              <button className="export-option-btn" onClick={handleExportCSS}>
                <div className="option-icon">📄</div>
                <div className="option-text">
                  <strong>Export as CSS</strong>
                  <small>Download as .css file</small>
                </div>
              </button>

              <button className="export-option-btn" onClick={() => {
                const json = JSON.stringify(theme, null, 2)
                const element = document.createElement('a')
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json))
                element.setAttribute('download', 'theme.json')
                element.style.display = 'none'
                document.body.appendChild(element)
                element.click()
                document.body.removeChild(element)
              }}>
                <div className="option-icon">📋</div>
                <div className="option-text">
                  <strong>Export as JSON</strong>
                  <small>Download as .json file</small>
                </div>
              </button>

              <button className="export-option-btn" onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(theme, null, 2))
                alert('Theme JSON copied to clipboard!')
              }}>
                <div className="option-icon">📋</div>
                <div className="option-text">
                  <strong>Copy as JSON</strong>
                  <small>Copy to clipboard</small>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      <button className="random-theme-btn" onClick={handleRandomTheme}>
        🎲 Generate Random Theme
      </button>
    </div>
  )
}

export default AdvancedTools
