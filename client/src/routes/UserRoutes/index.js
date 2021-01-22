import React from 'react'
import { Switch } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import Dashboard from '../../pages/Dashboard'
import Profile from '../../pages/Profile'

function UserRoutes({ match }) {
  console.log(match.path)
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={`${match.path}/dashboard`}
        component={Dashboard}
      />
      <ProtectedRoute
        exact
        path={`${match.path}/profile`}
        component={Profile}
      />
    </Switch>
  )
}

export default UserRoutes
