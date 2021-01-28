import React from 'react'

import './index.css'
import useChat from '../../utils/WebSocketio/useChat'
import { useUser } from '../../utils/UserContext'

const ChatRoom = ({ roomNumber }) => {
  const [user] = useUser()
  const roomId = roomNumber // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId, user.username) // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState('') // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    sendMessage(newMessage)
    setNewMessage('')
  }

  return (
    <div className="chat-room-container">
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? 'my-message' : 'received-message'
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  )
}

export default ChatRoom
