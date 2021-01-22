import React from 'react'
import { Switch } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import ViewPost from '../../pages/ViewPost'

function PostRoutes({ match }) {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={`${match.path}/view/:id`}
        component={ViewPost}
      />
    </Switch>
  )
}

export default PostRoutes
