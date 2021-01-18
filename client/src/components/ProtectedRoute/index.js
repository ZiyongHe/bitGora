import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ component: Component, auth, exact, path, ...props }) {
  const authorized = <Component auth={auth} {...props} />
  const unauthorized = <Redirect to="/" />
  return (
    <Route exact path={path} {...props}>
      {auth.username ? authorized : unauthorized}
    </Route>
  )
}

export default ProtectedRoute
