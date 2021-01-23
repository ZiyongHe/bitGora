import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { viewPost } from '../../utils/post-API'

function EditPost() {
  const { id } = useParams()
  const [post, setPost] = useState({
    _id: '',
    userName: '',
    userEmail: '',
    name: '',
    image: {
      publicId: '',
      url: '',
    },
    description: '',
    price: 0,
    sold: false,
  })

  useEffect(() => {
    viewPost(id).then((result) => {
      if (result.data) {
        setPost(result.data.postData)
      }
    })
  }, [])

  useEffect(() => console.log(post), [post])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    console.log(form.get('image'))
    form.set('image', '')
    console.log(form.get('image'))
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Edit a post</h1>
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
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default EditPost
