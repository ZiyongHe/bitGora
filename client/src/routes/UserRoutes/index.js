import React from 'react'
import { PostProvider } from '../../utils/PostContext'
import { Switch } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import Dashboard from '../../pages/Dashboard'
import Profile from '../../pages/Profile'
import PostRoutes from '../PostRoutes'
import ChatRoutes from '../ChatRoutes'
import { ChatProvider } from '../../utils/ChatContext'
import { RateProvider } from '../../utils/RateContext'

function UserRoutes({ match }) {
  // When defining child routes,
  // use this match.path property to construct the route
  // console.log(match.path)
  return (
    <RateProvider>
      <PostProvider>
        <ChatProvider>
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
            <ProtectedRoute
              path={`${match.path}/post`}
              component={PostRoutes}
            />

            {/* Route for chat routes */}
            <ProtectedRoute
              path={`${match.path}/chat`}
              component={ChatRoutes}
            />
          </Switch>
        </ChatProvider>
      </PostProvider>
    </RateProvider>
  )
}

export default UserRoutes
