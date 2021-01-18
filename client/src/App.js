import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { UserProvider } from './utils/UserContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home/Home'
import ChatRoom from './pages/Chatroom/ChatRoom'

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/chatroom" component={Signup} />
          <PublicRoute exact path="/home" component={Home} />
          <PublicRoute exact path="/:roomId" component={ChatRoom} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App
