import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../utils/UserContext'
import { useChat } from '../../utils/ChatContext'
import { getMessage } from '../../utils/message-API'

import './index.css'

const ChatRoom = () => {
  // use the activeRoom state from useChat
  const [user] = useUser()
  const { id } = useParams()
  const { sendMessage, activeRoom, setActiveRoom } = useChat()
  const [newMessage, setNewMessage] = useState('') // Message to be sent

  useEffect(() => {
    getMessage(id).then((res) => {
      setActiveRoom(res)
    })
  }, [id])

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    sendMessage(newMessage, id)
    setNewMessage('')
  }

  return (
    <div className="chat-room-container">
      <div className="messages-container">
        <ol className="messages-list">
          {activeRoom
            ? activeRoom.messages.map((message, i) => (
                <li
                  key={i}
                  className={`message-item ${
                    message.ownedByCurrentUser
                      ? 'my-message'
                      : 'received-message'
                  }`}
                >
                  {message.body}
                </li>
              ))
            : null}
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
