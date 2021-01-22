import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function PostCard({ post, editable }) {
  const editableLinks = (
    <div className="d-flex">
      <Card.Link href="#" className="btn btn-primary flex-grow-1 mr-3">
        Edit
      </Card.Link>
      <Button variant="danger" className="flex-grow-1">
        Delete
      </Button>
    </div>
  )

  const messageSeller = (
    <Card.Link href="#" className="btn btn-primary w-100">
      Message Seller
    </Card.Link>
  )

  return (
    <Card>
      <Card.Img variant="top" src={post.image} alt={post.name} />
      <Card.Body className="pb-0">
        <div className="d-sm-flex pb-3">
          <Card.Title className="flex-grow-1">{post.name}</Card.Title>
          <Card.Text className="flex-grow-1 text-sm-right h6">
            {post.price}
            <i className="fab fa-bitcoin ml-2" title="Bitcoin"></i>
            <br />
            20.00 (CAD)
          </Card.Text>
        </div>
        <Link to={`/post/${post._id}`}>View more</Link>
      </Card.Body>
      <Card.Body className="pt-0">
        <hr />
        {editable ? editableLinks : messageSeller}
      </Card.Body>
    </Card>
  )
}

export default PostCard
