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
      console.log('before entering a chat:')
      console.log(user)
      const index = user.chatRoom.indexOf(roomId)
      let newUserNotification = [...prevState.userNotification]
      newUserNotification[index] = 0
      console.log(newUserNotification)
      zeroDatabaseNotification(user.username, newUserNotification)
      console.log('after entering a chat:')
      console.log({ ...prevState, userNotification: newUserNotification })
      return { ...prevState, userNotification: newUserNotification }
    })
  }

  // update notification to user context is needed when user is online but not in active room
  // all data at back end is handled, this is only for context update
  function notify(roomId) {
    console.log('User before notifying for a new message:')
    console.log(user)
    setUser((prevState) => {
      const index = user.chatRoom.indexOf(roomId)
      const newUserNotification = prevState.userNotification.map(
        (element, i) => {
          if (i === index) element += 1
          return element
        }
      )
      console.log('After Notifying:')
      console.log({ ...prevState, userNotification: newUserNotification })
      return { ...prevState, userNotification: newUserNotification }
    })
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, zeroNotification, notify }}
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
