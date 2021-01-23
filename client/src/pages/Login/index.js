import React, { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useUser } from '../../utils/UserContext'
import { login } from '../../utils/user-API'

function Login(props) {
  // eslint-disable-next-line no-unused-vars
  const [_, setUser] = useUser()
  const [err, setErr] = useState('')
  const username = useRef('')
  const password = useRef('')

  const handleSubmit = (e) => {
    setUser((prevUser) => ({ loading: true, ...prevUser }))
    e.preventDefault()
    login(username.current.value, password.current.value).then((response) => {
      if (response.data) {
        setErr('')
        setUser({ loading: false, ...response.data })
        props.history.push('/user/dashboard')
      } else {
        setErr(response.err)
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control ref={username} type="text" placeholder="username" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control ref={password} type="password" />
      </Form.Group>
      {err ? <Alert variant="warning">{err}</Alert> : ''}
      <Button type="submit">Log In</Button>
    </Form>
  )
}

export default Login
