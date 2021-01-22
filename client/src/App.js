import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { UserProvider } from './utils/UserContext'
import { PostProvider } from './utils/PostContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import MainNav from './components/MainNav'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
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
            <PublicRoute exact path="/chatroom" component={Signup} />
            <PublicRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <PublicRoute exact path="/:roomId" component={ChatRoom} />
          </Switch>
        </Router>
      </PostProvider>
    </UserProvider>
  )
}

export default App
