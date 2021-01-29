import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { usePost } from '../../utils/PostContext'

function PostCard({ post, editable }) {
  const { handleDelete } = usePost()
  const editableLinks = (
    <div className="d-flex">
      <Link
        to={`/user/post/edit/${post._id}`}
        className="btn btn-primary flex-grow-1 mr-3"
      >
        Edit
      </Link>
      <Button
        variant="danger"
        className="flex-grow-1"
        onClick={() => handleDelete(post._id)}
      >
        Delete
      </Button>
    </div>
  )

  const messageSeller = (
    <Card.Link href="#" className="btn btn-warning w-100">
      Message Seller
    </Card.Link>
  )

  return (
    <Card>
      <Card.Img variant="top" src={post.image.url} alt={post.name} />
      <Card.Body>
        <Card.Title>{post.name}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
        <Card.Text className="h6 mt-4">
          {post.price}
          <i className="fab fa-bitcoin ml-2" title="Bitcoin"></i>
          <br />
          20.00 (CAD)
        </Card.Text>
      </Card.Body>
      <Card.Body className="pt-0">
        {editable ? editableLinks : messageSeller}
      </Card.Body>
    </Card>
  )
}

export default PostCard
