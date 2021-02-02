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
    // get chat room list with user name
    // for new created room, (create room id takes longer to be available) id is not in the database yet, so it's not listened by the socket.io
    // resolved: window.reload() after create a chat room. PostCard index line 20
    getChatRoom(user.username).then((res) => {
      setChats(res)

      // Creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL)

      res.forEach((room) => {
        socketRef.current.emit(SUBSCRIBE, room._id)
      })

      // Listens for incoming messages (add to FRONT END context provider)
      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        // find the right chatroom object
        // save the message to it
        setChats((prevState) =>
          prevState.map((room) => {
            // append the new message to its room in chatsContext chats state
            if (room._id === message.roomId) {
              room.messages.push(message._id)
            }
            return room
          })
        )
        // if the new message is for the current active room, append to activeRoom state too
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

  const joinNewRoom = (res) => {
    setChats((prevState) => [...prevState, res])
    socketRef.current.emit(SUBSCRIBE, res._id)
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        sendMessage,
        activeRoom,
        setActiveRoom,
        joinNewRoom,
      }}
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
