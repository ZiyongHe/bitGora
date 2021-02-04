import React, { useRef, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useUser } from '../../utils/UserContext'
import { login } from '../../utils/user-API'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../img/bitgora-wordmark.svg'
import './style.css'

function Login(props) {
  // eslint-disable-next-line no-unused-vars
  const { _, setUser } = useUser()
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
    <div className="blue-bg p-3 p-md-0">
      <Container fluid className="h-100 p-md-0">
        <Row
          id="login-row"
          className="justify-content-center justify-content-sm-start"
        >
          <Col
            id="login-col"
            xs={12}
            md={6}
            lg={5}
            className="white-bg mt-5 mt-md-0"
          >
            <Row className="justify-content-center mb-5">
              <Col xs={6}>
                <Logo />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control ref={username} type="text" />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={password} type="password" />
                  </Form.Group>
                  {err ? <Alert variant="warning">{err}</Alert> : ''}
                  <div className="w-100 d-flex flex-column align-items-center mt-4">
                    <p className="mb-0 text-center">
                      Don't have an account yet?
                    </p>
                    <Link to="/signup" className="text-center">
                      Create an account
                    </Link>
                    <Button
                      type="submit"
                      size="lg"
                      variant="warning"
                      className="mt-4 mb-3"
                    >
                      Log In
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
