import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link, useHistory } from 'react-router-dom'
import { usePost } from '../../utils/PostContext'
import { newChatRoom } from '../../utils/message-API'
import { useUser } from '../../utils/UserContext'
import { useChat } from '../../utils/ChatContext'

function PostCard({ post, editable }) {
  const { handleDelete } = usePost()
  const [user] = useUser()
  let history = useHistory()
  const { joinNewRoom } = useChat()

  const handleMessageBtn = (id, username) => {
    newChatRoom(id, username).then((res) => {
      joinNewRoom(res)
      history.push(`/user/chat/room/${res._id}`)
    })
  }

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
    <button
      onClick={() => handleMessageBtn(post._id, user.username)}
      className="btn btn-warning w-100"
    >
      Message Seller
    </button>
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
