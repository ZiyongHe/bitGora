import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUser } from '../../utils/UserContext'

function PublicRoute({ component: Component, exact, path, ...extra }) {
  const [user] = useUser()
  return (
    <Route
      exact
      path={path}
      render={(props) => {
        if (!user.username) {
          return <Component {...extra} {...props} />
        } else {
          return <Redirect to="/dashboard" />
        }
      }}
    />
  )
}

export default PublicRoute
