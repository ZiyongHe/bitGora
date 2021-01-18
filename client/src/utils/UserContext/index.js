import React, { useState, useEffect } from 'react'
import { getSession } from '../user-API.js'

const UserContext = React.createContext()

export function UserProvider(props) {
  const [user, setUser] = useState({
    loading: true,
    username: '',
    email: '',
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

  return <UserContext.Provider value={[user, setUser]} {...props} />
}

export function useUser() {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be called from a descendent of UserProvider.')
  }
  return context
}
