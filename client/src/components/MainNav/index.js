import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useUser } from '../../utils/UserContext'
import { logout } from '../../utils/user-API'

function MainNav() {
  const [user, setUser] = useUser()
  const history = useHistory()

  const handleLogout = () => {
    logout().then(() => {
      setUser({})
      history.push('/')
    })
  }

  const userMenu = (
    <>
      <Navbar.Toggle aria-controls="main-nav" />
      <Navbar.Collapse id="main-nav">
        <Nav>
          <Link className="nav-link" onClick={handleLogout}>
            Logout
          </Link>
        </Nav>
      </Navbar.Collapse>
    </>
  )

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>BitGora</Navbar.Brand>
      {user.username ? userMenu : <></>}
    </Navbar>
  )
}

export default MainNav
