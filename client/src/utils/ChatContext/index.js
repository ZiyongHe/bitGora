import React, { useState, useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { useUser } from '../../utils/UserContext'
import { getChatRoom } from '../message-API'
import { addUserNotification } from '../user-API'

const ChatContext = React.createContext()

const SOCKET_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bitgora.herokuapp.com/'
    : 'http://localhost:3001'

const SUBSCRIBE = 'subscribe'
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage' // Name of the event

export function ChatProvider(props) {
  const { user, setUser } = useUser()
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
    getChatRoom(user.username).then((res) => {
      setChats(res)

      // Creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL)

      res.forEach((room) => {
        socketRef.current.emit(SUBSCRIBE, room._id)
      })

      // Listens for incoming messages (add to FRONT END context provider)
      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, handleNewMessage)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  const sendMessage = (messageBody, roomId, receiver) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      roomId: roomId,
      body: messageBody,
      username: user.username,
      receiver: receiver,
      senderId: socketRef.current.id,
    })
  }

  const joinNewRoom = (res) => {
    const existingRoom = chats.find((room) => room._id === res._id)
    if (!existingRoom) {
      setChats((prevState) => [...prevState, res])
      socketRef.current.emit(SUBSCRIBE, res._id)
    }
  }

  const handleNewMessage = (message) => {
    // find the right chatroom object
    // save the message to it
    setChats((prevState) => {
      return prevState.map((room, index) => {
        // append the new message to its room in chatsContext chats state
        if (room._id === message.roomId) {
          room.messages.push(message._id)
          // filter for setting Chat context:
          // only for receiver that is not in current room but online
          if (message.roomId !== activeRoomId.current) {
            // add notification for receiver not in current room, for online and offline cases
            room.members.forEach((member, i) => {
              if (member !== message.username) {
                room.chatNotification[i] += 1
                // add notification to user context - userNotification and chatroom list are related by index
                let newUserNotification = user.userNotification
                newUserNotification[index] += 1
                setUser((prevState) => {
                  const updatedUser = {
                    ...prevState,
                    userNotification: newUserNotification,
                  }
                  console.log('Logging context update:')
                  console.log(updatedUser)
                  // add notification to user database
                  addUserNotification(member, newUserNotification)
                  return updatedUser
                })
              }
            })
          }
        }
        console.log(room)
        return room
      })
    })

    // if the new message is for the current active room, append to activeRoom state too
    if (message.roomId === activeRoomId.current) {
      setActiveRoom((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }))
    }
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
