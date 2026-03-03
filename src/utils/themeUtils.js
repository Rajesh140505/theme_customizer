// Default theme configuration
export const DEFAULT_THEME = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#ec4899',
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  textMuted: '#cbd5e1',
  border: '#334155',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
}

// Preset themes
export const THEME_PRESETS = {
  ocean: {
    name: 'Ocean Wave',
    primary: '#0369a1',
    secondary: '#0284c7',
    accent: '#06b6d4',
    background: '#0c2340',
    surface: '#082f49',
    text: '#e0f2fe',
    textMuted: '#7dd3fc',
  },
  sunset: {
    name: 'Sunset',
    primary: '#ea580c',
    secondary: '#f97316',
    accent: '#fbbf24',
    background: '#3d1814',
    surface: '#5a291f',
    text: '#fef3c7',
    textMuted: '#fed7aa',
  },
  forest: {
    name: 'Forest',
    primary: '#15803d',
    secondary: '#22c55e',
    accent: '#84cc16',
    background: '#0d2818',
    surface: '#15421a',
    text: '#dbeafe',
    textMuted: '#bbf7d0',
  },
  amethyst: {
    name: 'Amethyst',
    primary: '#7c3aed',
    secondary: '#a855f7',
    accent: '#d946ef',
    background: '#2e1065',
    surface: '#4c1d95',
    text: '#ede9fe',
    textMuted: '#d8b4fe',
  },
}

// Load theme from localStorage
export const loadTheme = () => {
  try {
    const saved = localStorage.getItem('appTheme')
    return saved ? JSON.parse(saved) : DEFAULT_THEME
  } catch (error) {
    console.error('Error loading theme:', error)
    return DEFAULT_THEME
  }
}

// Save theme to localStorage
export const saveTheme = (theme) => {
  try {
    localStorage.setItem('appTheme', JSON.stringify(theme))
  } catch (error) {
    console.error('Error saving theme:', error)
  }
}

// Apply theme to DOM
export const applyTheme = (theme) => {
  const root = document.documentElement
  Object.entries(theme).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
    root.style.setProperty(cssVar, value)
  })
}

// Generate contrasting text color
export const getContrastColor = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

// Get color brightness
export const getBrightness = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000
}

// Generate complementary color
export const getComplementaryColor = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  
  const comp_r = 255 - r
  const comp_g = 255 - g
  const comp_b = 255 - b
  
  return `#${[comp_r, comp_g, comp_b].map(x => x.toString(16).padStart(2, '0')).join('')}`
}

// Generate random color
export const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

// Generate random theme
export const generateRandomTheme = () => {
  return {
    primary: generateRandomColor(),
    secondary: generateRandomColor(),
    accent: generateRandomColor(),
    background: generateRandomColor(),
    surface: generateRandomColor(),
    text: generateRandomColor(),
    textMuted: generateRandomColor(),
    border: generateRandomColor(),
    success: generateRandomColor(),
    warning: generateRandomColor(),
    error: generateRandomColor(),
  }
}

// Calculate WCAG contrast ratio
export const getContrastRatio = (color1, color2) => {
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 255
    const g = (rgb >> 8) & 255
    const b = rgb & 255
    
    const [rs, gs, bs] = [r, g, b].map(x => {
      x = x / 255
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }
  
  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2)
}

// Get WCAG compliance level
export const getWCAGLevel = (ratio) => {
  const r = parseFloat(ratio)
  if (r >= 7) return { level: 'AAA', color: '#10b981', text: 'AAA - Excellent' }
  if (r >= 4.5) return { level: 'AA', color: '#f59e0b', text: 'AA - Good' }
  return { level: 'Fail', color: '#ef4444', text: 'Fail - Poor' }
}

// Save themes to localStorage
export const saveThemes = (themes) => {
  try {
    localStorage.setItem('allThemes', JSON.stringify(themes))
  } catch (error) {
    console.error('Error saving themes:', error)
  }
}

// Load all themes from localStorage
export const loadThemes = () => {
  try {
    const saved = localStorage.getItem('allThemes')
    return saved ? JSON.parse(saved) : {}
  } catch (error) {
    console.error('Error loading themes:', error)
    return {}
  }
}

// Export theme as CSS file
export const exportThemeAsCSS = (theme, themeName = 'custom-theme') => {
  const cssContent = `:root {
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --accent: ${theme.accent};
  --background: ${theme.background};
  --surface: ${theme.surface};
  --text: ${theme.text};
  --text-muted: ${theme.textMuted};
  --border: ${theme.border};
  --success: ${theme.success};
  --warning: ${theme.warning};
  --error: ${theme.error};
}
`
  
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cssContent))
  element.setAttribute('download', `${themeName}.css`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

// Get harmony colors (triadic)
export const getHarmonyColors = (hexColor) => {
  const hslToRgb = (h, s, l) => {
    s /= 100
    l /= 100
    const k = n => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))]
  }
  
  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
  }
  
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  
  const [h, s, l] = rgbToHsl(r, g, b)
  
  const triadic1 = hslToRgb((h + 120) % 360, s, l)
  const triadic2 = hslToRgb((h + 240) % 360, s, l)
  
  const toHex = (rgb) => '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('')
  
  return {
    original: hexColor,
    triadic1: toHex(triadic1),
    triadic2: toHex(triadic2),
  }
}
