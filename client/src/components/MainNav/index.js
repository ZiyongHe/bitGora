import React from 'react'
import { useHistory, link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useUser } from '../../utils/UserContext'
import { logout } from '../../utils/user-API'
import Dashboard from '../../pages/Dashboard/index'

function MainNav() {
  const [user, setUser] = useUser()
  const history = useHistory()

  const handleLogout = () => {
    setUser((prevUser) => ({ loading: true, ...prevUser }))
    logout().then(() => {
      setUser({ loading: false, username: '', email: '' })
      history.push('/')
    })
  }

  const userMenu = (
    <>
      <Navbar.Toggle aria-controls="main-nav" />
      <Navbar.Collapse id="main-nav">
        <span>Welcome {user.username}</span>
        <Nav>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  )

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>BitGora</Navbar.Brand>
        {!user.loading && user.username ? userMenu : <></>}
      </Navbar>
      {!user.loading && user.username ? <Dashboard /> : <></>}
    </>
  )
}

export default MainNav
