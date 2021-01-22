import React from 'react'
import { Switch } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import ViewPost from '../../pages/ViewPost'
import CreatePost from '../../pages/CreatePost'

function PostRoutes({ match }) {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={`${match.path}/view/:id`}
        component={ViewPost}
      />
      <ProtectedRoute
        exact
        path={`${match.path}/create`}
        component={CreatePost}
      />
    </Switch>
  )
}

export default PostRoutes