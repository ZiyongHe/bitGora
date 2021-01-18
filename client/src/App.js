import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {
  const [auth, setAuth] = useState({})

  useEffect(() => {
    fetch('/user/current-session')
      .then((response) => response.json())
      .then((session) => setAuth(session.data))
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute
          exact
          path="/dashboard"
          component={Dashboard}
          auth={auth}
        />
      </Switch>
    </Router>
  )
}

export default App
