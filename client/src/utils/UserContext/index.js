import React, { useState, useEffect } from 'react'
import { getSession } from '../user-API.js'

const UserContext = React.createContext()

export function UserProvider(props) {
  const [user, setUser] = useState({})

  useEffect(() => {
    getSession().then((session) => {
      setUser(session.data)
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
