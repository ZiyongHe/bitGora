import React from 'react'
import { PostProvider } from '../../utils/PostContext'
import { Switch } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import Dashboard from '../../pages/Dashboard'
import Profile from '../../pages/Profile'
import PostRoutes from '../PostRoutes'
import ChatRoutes from '../ChatRoutes'

function UserRoutes({ match }) {
  // When defining child routes,
  // use this match.path property to construct the route
  // console.log(match.path)
  return (
    <PostProvider>
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

        {/* Route for post routes */}
        <ProtectedRoute path={`${match.path}/post`} component={PostRoutes} />

        {/* Route for chat routes */}
        <ProtectedRoute path={`${match.path}/chat`} component={ChatRoutes} />
      </Switch>
    </PostProvider>
  )
}

export default UserRoutes
