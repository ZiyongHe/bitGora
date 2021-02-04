import React, { useState, useEffect } from 'react'
import { getSession, zeroDatabaseNotification } from '../user-API.js'

const UserContext = React.createContext()

export function UserProvider(props) {
  const [user, setUser] = useState({
    loading: true,
    username: '',
    email: '',
    chatRoom: [],
    userNotification: [],
  })

  useEffect(() => {
    getSession()
      .then((session) => {
        setUser({ loading: false, ...session.data })
      })
      .catch((err) => {
        setUser({ loading: false, username: '', email: '' })
      })
  }, [])

  function zeroNotification(roomId) {
    // notification auto add up to user database when receiving each new message,
    // zeroNotification is used when adding notification is not needed.
    // zero notification zeroes both context and database, a save overkill method,
    // used for receiving message while "in active room" & entering any chatroom
    setUser((prevState) => {
      console.log(user)
      if (user.chatRoom) {
        const index = user.chatRoom.indexOf(roomId)
        const newUserNotification = prevState.userNotification.map(
          (element, i) => {
            if (i === index) element = 0
            return element
          }
        )
        zeroDatabaseNotification(user.username, newUserNotification)
        return { ...prevState, userNotification: newUserNotification }
      } else {
        return prevState
      }
    })
  }

  // adding notification to context is needed when user is online but not in active room

  return (
    <UserContext.Provider
      value={{ user, setUser, zeroNotification }}
      {...props}
    />
  )
}

export function useUser() {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be called from a descendent of UserProvider.')
  }
  return context
}
