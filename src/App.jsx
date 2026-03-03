import { useState, useEffect } from 'react'
import './App.css'
import ThemeCustomizer from './components/ThemeCustomizer'
import PreviewSection from './components/PreviewSection'
import { loadTheme, saveTheme, applyTheme } from './utils/themeUtils'

function App() {
  const [theme, setTheme] = useState(() => loadTheme())
  const [history, setHistory] = useState([theme])
  const [historyIndex, setHistoryIndex] = useState(0)

  const handleThemeChange = (newTheme) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newTheme)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setTheme(newTheme)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setTheme(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setTheme(history[historyIndex + 1])
    }
  }

  useEffect(() => {
    applyTheme(theme)
    saveTheme(theme)
  }, [theme])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎨 Theme Customizer</h1>
        <p className="subtitle">Create your perfect color scheme</p>
      </header>

      <main className="app-main">
        <div className="content-grid">
          <ThemeCustomizer 
            theme={theme} 
            setTheme={handleThemeChange}
            undo={undo}
            redo={redo}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
          />
          <PreviewSection theme={theme} />
        </div>
      </main>

      <footer className="app-footer">
        <p>💾 Your theme is automatically saved</p>
      </footer>
    </div>
  )
}

export default App
