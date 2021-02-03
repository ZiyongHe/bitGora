import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { updatePost } from '../../utils/post-API'
import { useHistory } from 'react-router-dom'
import { usePost } from '../../utils/PostContext'
import { UPDATE_OWNED_POST } from '../../utils/PostContext/actions.js'

function EditPost() {
  const history = useHistory()
  const { posts, dispatch, handleDelete } = usePost()
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
    const selectedPost = posts.ownedPosts.find((post) => post._id === id)
    setPost(selectedPost)
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
    if (form.get('sold') === 'on') {
      form.set('sold', true)
    } else {
      form.set('sold', false)
    }
    updatePost(form).then((response) => {
      dispatch({ type: UPDATE_OWNED_POST, newPost: response.data })
      history.push('/user/profile')
    })
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-3">Edit a post</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="mb-4" onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Title</Form.Label>
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
              <p className="mb-1">Image of Product</p>
              <img
                className="border rounded mb-2"
                src={post.image.url}
                alt={`Original ${post.name}`}
                width="75%"
                height="auto"
              />
              <Form.File
                name="image"
                label="Choose new image"
                accept="image/*"
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
                step={0.01}
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
                name="sold"
                checked={post.sold}
                type="checkbox"
                label="Mark as sold"
                onChange={(e) =>
                  setPost((prevState) => ({
                    ...prevState,
                    sold: !prevState.sold,
                  }))
                }
              />
            </Form.Group>
            <Button className="mr-3" variant="primary" type="submit">
              Save
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDelete(post._id, () => history.push('/user/profile'))
              }}
            >
              Delete
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default EditPost
