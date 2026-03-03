import '../styles/PreviewSection.css'

function PreviewSection({ theme }) {
  return (
    <div className="preview-section">
      <h2>👀 Live Preview</h2>

      <div className="preview-container" style={{
        '--preview-primary': theme.primary,
        '--preview-secondary': theme.secondary,
        '--preview-accent': theme.accent,
        '--preview-background': theme.background,
        '--preview-surface': theme.surface,
        '--preview-text': theme.text,
        '--preview-text-muted': theme.textMuted,
        '--preview-border': theme.border,
        '--preview-success': theme.success,
        '--preview-warning': theme.warning,
        '--preview-error': theme.error,
      }}>
        
        <div className="preview-card">
          <h3>Sample Card</h3>
          <p>This is a preview of your theme. Watch it update in real-time as you customize your colors.</p>
          <div className="button-group">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
            <button className="btn btn-accent">Accent Button</button>
          </div>
        </div>

        <div className="preview-alerts">
          <div className="alert alert-success">
            ✅ Success message preview
          </div>
          <div className="alert alert-warning">
            ⚠️ Warning message preview
          </div>
          <div className="alert alert-error">
            ❌ Error message preview
          </div>
        </div>

        <div className="preview-content">
          <h4>Typography Preview</h4>
          <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
          <p className="text-muted">This is muted text, useful for secondary information.</p>
          
          <div className="code-block">
            <code>const app = theme.primary: {theme.primary}</code>
          </div>
        </div>

        <div className="preview-grid">
          <div className="grid-item" style={{backgroundColor: theme.primary}}>Primary</div>
          <div className="grid-item" style={{backgroundColor: theme.secondary}}>Secondary</div>
          <div className="grid-item" style={{backgroundColor: theme.accent}}>Accent</div>
          <div className="grid-item" style={{backgroundColor: theme.success}}>Success</div>
          <div className="grid-item" style={{backgroundColor: theme.warning}}>Warning</div>
          <div className="grid-item" style={{backgroundColor: theme.error}}>Error</div>
        </div>

        <div className="preview-form">
          <h4>Form Elements</h4>
          <input type="text" placeholder="Text input..." className="form-input" />
          <textarea placeholder="Textarea..." className="form-input" rows="3"></textarea>
          <select className="form-input">
            <option>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            Remember me
          </label>
        </div>
      </div>
    </div>
  )
}

export default PreviewSection
