import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Signup(props) {
  const email = useRef('')
  const username = useRef('')
  const password = useRef('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email.current.value)
    console.log(username.current.value)
    console.log(password.current.value)
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
