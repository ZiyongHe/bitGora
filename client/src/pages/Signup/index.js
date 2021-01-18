import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { signup } from '../../utils/user-API'

function Signup(props) {
  const email = useRef('')
  const username = useRef('')
  const password = useRef('')

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(
      email.current.value,
      username.current.value,
      password.current.value
    ).then((response) => {
      if (response.data) {
        console.log(response.data)
      } else {
        console.log(response.err)
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          ref={email}
          type="email"
          placeholder="email@example.com"
        />
      </Form.Group>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control ref={username} type="text" placeholder="username" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control ref={password} type="password" />
      </Form.Group>
      <Button type="submit">Sign Up</Button>
    </Form>
  )
}

export default Signup
