import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUser } from '../../utils/UserContext'

function PublicRoute({ component: Component, exact, path, ...extra }) {
  const { user } = useUser()
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (user.loading) {
          return <></>
        } else if (!user.username) {
          return <Component {...extra} {...props} />
        } else {
          return <Redirect to="/user/dashboard" />
        }
      }}
    />
  )
}

export default PublicRoute
