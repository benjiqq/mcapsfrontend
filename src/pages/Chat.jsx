import ChatSection from '../components/ChatSection'
import './Chat.css'

function Chat() {
  return (
    <div className="chat-page">
      <header className="page-header">
        <h1>Chat with Crypto Data</h1>
        <p className="page-description">
          Ask questions about cryptocurrency prices, market caps, volumes, and trends.
        </p>
      </header>

      <ChatSection />
    </div>
  )
}

export default Chat

