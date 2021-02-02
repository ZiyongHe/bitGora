import React from 'react'
import { Switch } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import ChatRoomList from '../../pages/ChatRoomList'
import ChatRoom from '../../pages/ChatRoom'

function ChatRoutes({ match }) {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={`${match.path}/list`}
        component={ChatRoomList}
      />
      <ProtectedRoute
        exact
        path={`${match.path}/room/:id`}
        component={ChatRoom}
      />
    </Switch>
  )
}

export default ChatRoutes
