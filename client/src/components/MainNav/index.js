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
        <div className="d-lg-flex justify-content-between w-100">
          <Navbar.Text>
            Welcome! <span className="font-weight-bolder">{user.username}</span>
          </Navbar.Text>
          <Nav>
            <Link to="/user/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/user/profile" className="nav-link">
              Your Posts
            </Link>
            <Link to="/user/post/create" className="nav-link">
              Create Post
            </Link>
            <Link to="/user/chat/list" className="nav-link">
              Conversations
            </Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
    </>
  )

  return (
    <Navbar expand="lg" id="main-nav" className="sticky-top">
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
