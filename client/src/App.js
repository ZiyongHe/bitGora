import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { UserProvider } from './utils/UserContext'
import { PostProvider } from './utils/PostContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import MainNav from './components/MainNav'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserRoutes from './routes/UserRoutes'
import ViewPost from './pages/ViewPost'
import Home from './pages/Home/Home'
import ChatRoom from './pages/Chatroom/ChatRoom'

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <Router>
          <MainNav />
          <Switch>
            <PublicRoute exact path="/" component={Login} />
            <PublicRoute exact path="/signup" component={Signup} />
            <ProtectedRoute path="/user" component={UserRoutes} />
            <ProtectedRoute exact path="/post/:id" component={ViewPost} />

            {/* Currently unused */}
            <PublicRoute exact path="/home" component={Home} />
            <PublicRoute exact path="/chatroom" component={Signup} />
            <PublicRoute exact path="/:roomId" component={ChatRoom} />
          </Switch>
        </Router>
      </PostProvider>
    </UserProvider>
  )
}

export default App
