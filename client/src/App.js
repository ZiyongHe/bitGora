import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { UserProvider } from './utils/UserContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import MainNav from './components/MainNav'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserRoutes from './routes/UserRoutes'

function App() {
  return (
    <UserProvider>
      <Router>
        <MainNav />
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute exact path="/signup" component={Signup} />
          <ProtectedRoute path="/user" component={UserRoutes} />
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App
