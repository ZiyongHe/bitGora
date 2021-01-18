import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUser } from '../../utils/UserContext'

function ProtectedRoute({ component: Component, exact, path, ...props }) {
  const [user] = useUser()
  const authorized = <Component {...props} />
  const unauthorized = <Redirect to="/" />
  return (
    <Route exact path={path} {...props}>
      {user.username ? authorized : unauthorized}
    </Route>
  )
}

export default ProtectedRoute
