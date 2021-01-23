import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { viewPost, updatePost } from '../../utils/post-API'
import { useHistory } from 'react-router-dom'

function EditPost() {
  const history = useHistory()
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
  const [imageFile, setImageFile] = useState('')

  useEffect(() => {
    viewPost(id).then((result) => {
      if (result.data) {
        setPost(result.data.postData)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (imageFile) {
      setPost((prevState) => ({
        ...prevState,
        image: {
          ...prevState.image,
          // to create an image preview
          url: URL.createObjectURL(imageFile),
        },
      }))
    }
    // to free up memory
    return URL.revokeObjectURL(imageFile)
  }, [imageFile])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    form.append('_id', post._id)
    updatePost(form).then((response) => history.push('/user/profile'))
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
                value={post.name}
                onChange={(e) =>
                  setPost((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                name="name"
                type="text"
                placeholder="My Amazing Product"
              />
            </Form.Group>
            <Form.Group controlId="image">
              <img
                src={post.image.url}
                alt={`Original ${post.name}`}
                width="100%"
                height="auto"
              />
              <Form.File
                name="image"
                label="Choose new image"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={post.description}
                onChange={(e) =>
                  setPost((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
                rows={4}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="price"
                value={post.price}
                onChange={(e) =>
                  setPost((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="sold">
              <Form.Check
                checked={post.sold}
                type="checkbox"
                label="Mark as sold?"
                onChange={(e) =>
                  setPost((prevState) => ({
                    ...prevState,
                    sold: !prevState.sold,
                  }))
                }
              />
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
