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
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to={!user.loading && user.username ? '/user/dashboard' : '/'}>
          BitGora
        </Link>
      </Navbar.Brand>
      {!user.loading && user.username ? userMenu : <></>}
    </Navbar>
  )
}

export default MainNav
