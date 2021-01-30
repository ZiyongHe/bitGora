import React, { useState, useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { useUser } from '../../utils/UserContext'
import { getChatRoom } from '../message-API'

const ChatContext = React.createContext()

const SOCKET_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bitgora.herokuapp.com/'
    : 'http://localhost:3001'

const SUBSCRIBE = 'subscribe'
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage' // Name of the event

export function ChatProvider(props) {
  const [user] = useUser()
  const [chats, setChats] = useState([
    {
      _id: '',
      messages: [],
      members: [],
    },
  ])
  const [activeRoom, setActiveRoom] = useState({
    _id: '',
    messages: [],
    members: [],
  })
  const socketRef = useRef()
  const activeRoomId = useRef()

  useEffect(() => {
    activeRoomId.current = activeRoom._id
  }, [activeRoom])

  useEffect(() => {
    getChatRoom(user.username).then((res) => {
      setChats(res)

      // Creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL)

      res.forEach((room) => {
        socketRef.current.emit(SUBSCRIBE, room._id)
      })

      // Listens for incoming messages
      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        // find the right chatroom object
        // save the message to it
        setChats((prevState) =>
          prevState.map((room) => {
            if (room._id === message.roomId) {
              room.messages.push(message._id)
            }
            return room
          })
        )
        if (message.roomId === activeRoomId.current) {
          setActiveRoom((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
          }))
        }
      })
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [activeRoomId])

  const sendMessage = (messageBody, roomId) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      roomId: roomId,
      body: messageBody,
      username: user.username,
      senderId: socketRef.current.id,
    })
  }

  return (
    <ChatContext.Provider
      value={{ chats, setChats, sendMessage, activeRoom, setActiveRoom }}
      {...props}
    />
  )
}

export function useChat() {
  const context = React.useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be called from a descendent of ChatProvider.')
  }
  return context
}
