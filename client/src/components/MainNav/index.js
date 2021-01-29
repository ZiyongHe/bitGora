import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useUser } from '../../utils/UserContext'
import { logout } from '../../utils/user-API'
import { ReactComponent as Logo } from '../../img/bitgora-logo.svg'

import './style.css'

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
      <Navbar.Toggle aria-controls="menu" />
      <Navbar.Collapse id="menu">
        <span>Welcome {user.username}</span>
        <Nav>
          <Link to="/user/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/user/post/create" className="nav-link">
            Create Post
          </Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  )

  return (
    <Navbar expand="lg" id="main-nav">
      <Navbar.Brand>
        <Link to={!user.loading && user.username ? '/user/dashboard' : '/'}>
          <Logo height="40" />
        </Link>
      </Navbar.Brand>
      {!user.loading && user.username ? userMenu : <></>}
    </Navbar>
  )
}

export default MainNav
