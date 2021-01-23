import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { usePost } from '../../utils/PostContext'
import { useParams } from 'react-router-dom'
import { viewPost } from '../../utils/post-API'

function ViewPost() {
  const { handleDelete } = usePost()
  const { id } = useParams()
  const [post, setPost] = useState({
    postData: {
      userName: '',
      userEmail: '',
      name: '',
      image: '',
      description: '',
      price: '',
      createdAt: '',
      sold: false,
    },
    isOwned: false,
  })
  const [err, setErr] = useState('')

  useEffect(() => {
    viewPost(id)
      .then((response) => {
        if (response.err) {
          setErr(response.err)
        } else {
          setPost(response.data)
        }
      })
      .catch(() => {
        setErr('Something went wrong. Cannot view post data.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editableLinks = (
    <div className="d-flex">
      <Button variant="primary" className="flex-grow-1 mr-3">
        Edit
      </Button>
      <Button
        variant="danger"
        className="flex-grow-1"
        onClick={() => handleDelete(post.postData._id)}
      >
        Delete
      </Button>
    </div>
  )

  const messageSeller = (
    <Button variant="primary" className="w-100">
      Message Seller
    </Button>
  )

  return (
    <Container>
      <Row>
        <p>{err}</p>
        <Col>
          <h1>{post.postData.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <img
            src={post.postData.image.url}
            alt={post.postData.name}
            width="100%"
            height="auto"
          />
        </Col>
        <Col xs={12} lg={6}>
          <Row>
            <Col>
              <p>
                {post.postData.price}
                <i className="fab fa-bitcoin ml-2" title="Bitcoin"></i>
                <br />
                20.00 (CAD)
              </p>
            </Col>
          </Row>
          <Row>
            <Col>{post.postData.description}</Col>
          </Row>
          <Row>
            <Col>{post.isOwned ? editableLinks : messageSeller}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default ViewPost
