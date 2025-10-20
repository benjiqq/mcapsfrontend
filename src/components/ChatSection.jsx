import { useState } from 'react'
import './ChatSection.css'

function ChatSection() {
  const [message, setMessage] = useState('')
  const [vsCurrency, setVsCurrency] = useState('usd')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Send chat message to API
  const handleSend = async () => {
    const msg = message.trim()
    if (!msg) return

    setLoading(true)
    setError('')
    setReply('')

    try {
      const url = `/chat?message=${encodeURIComponent(msg)}&vs_currency=${encodeURIComponent(vsCurrency)}`
      const res = await fetch(url, { method: 'POST' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setReply(data.reply || 'No reply')
    } catch (e) {
      setError(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  // Handle keyboard shortcut (Cmd/Ctrl + Enter)
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <section className="chat">
      <h2>Chat with the data</h2>
      <p className="muted">Ask questions like: top gainers today? highest volume coins?</p>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question..."
      />

      <div className="chat-controls">
        <label>
          VS Currency
          <select value={vsCurrency} onChange={(e) => setVsCurrency(e.target.value)}>
            <option value="usd">USD</option>
          </select>
        </label>
        <button onClick={handleSend} disabled={loading || !message.trim()}>
          Send
        </button>
        {loading && <span className="loading">Thinking...</span>}
        {error && <span className="error">{error}</span>}
      </div>

      {reply && (
        <div className="chat-output">
          {reply}
        </div>
      )}
    </section>
  )
}

export default ChatSection

