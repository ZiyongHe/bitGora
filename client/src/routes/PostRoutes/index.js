import React from 'react'
import { Switch } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import CreatePost from '../../pages/CreatePost'
import EditPost from '../../pages/EditPost'

function PostRoutes({ match }) {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={`${match.path}/create`}
        component={CreatePost}
      />
      <ProtectedRoute
        exact
        path={`${match.path}/edit/:id`}
        component={EditPost}
      />
    </Switch>
  )
}

export default PostRoutes
