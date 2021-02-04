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

  function zeroContextNotification(roomId) {
    setUser((prevState) => {
      const index = prevState.chatRoom.indexOf(roomId)
      const newUserNotification = prevState.userNotification.map(
        (element, i) => {
          if (i === index) element = 0
          return element
        }
      )
      zeroDatabaseNotification(user.username, newUserNotification)
      return { ...prevState, userNotification: newUserNotification }
    })
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, zeroContextNotification }}
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
