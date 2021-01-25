import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createPost } from '../../utils/post-API'
import { useHistory } from 'react-router-dom'
import { ADD_OWNED_POST, SET_ERR } from '../../utils/PostContext/actions.js'
import { usePost } from '../../utils/PostContext'

function CreatePost() {
  const history = useHistory()
  // eslint-disable-next-line no-unused-vars
  const { dispatch } = usePost()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    createPost(formData).then((response) => {
      if (response.err) {
        dispatch({ type: SET_ERR, err: response.err })
      } else {
        dispatch({ type: ADD_OWNED_POST, newPost: response.data })
        history.push('/user/profile')
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Create a post</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="My Amazing Product"
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.File name="image" label="Image of Product" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" rows={4} />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" min="0" name="price" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Post
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreatePost
