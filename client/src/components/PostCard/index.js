import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link, useHistory } from 'react-router-dom'
import { usePost } from '../../utils/PostContext'
import { newChatRoom } from '../../utils/message-API'
import { useUser } from '../../utils/UserContext'
import { useChat } from '../../utils/ChatContext'
import { useRate } from '../../utils/RateContext'
import AnimatedNumber from 'animated-number-react'

import './style.css'

function PostCard({ post, editable }) {
  const { handleDelete } = usePost()
  const { user } = useUser()
  let history = useHistory()
  const { joinNewRoom } = useChat()
  const [rate] = useRate()

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
        className="btn btn-warning flex-grow-1 mr-3"
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

  const isSold = <p className="btn-sold px-3 py-1 mb-1">Sold</p>

  const price = rate * post.price
  function formatValue(value) {
    return `(${Number(value).toFixed(0)} CAD)`
  }

  return (
    <Card>
      <Card.Img variant="top" src={post.image.url} alt={post.name} />
      <Card.Body>
        <Card.Title>{post.name}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
        <div className="d-flex flex-column align-items-end mt-4">
          {post.sold ? isSold : null}
          <h4 className="d-flex mb-0">
            {post.price.toFixed(2)}
            <i
              className="fab fa-btc ml-2 d-flex align-items-center"
              title="Bitcoin"
            ></i>
          </h4>
          <AnimatedNumber
            className="d-flex justify-content-end"
            value={price}
            formatValue={formatValue}
            duration={800}
          />
          <Card.Text
            className={`sold-by-text mt-2 ${
              !editable && post.sold ? 'mb-0' : ''
            }`}
          >
            Sold by: <i className="fas fa-user-circle mr-1 ml-2"></i>
            {post.userName === user.username ? 'You' : post.userName}
          </Card.Text>
        </div>
      </Card.Body>
      <Card.Body className={`pt-0 ${!editable && post.sold ? 'pb-0' : ''}`}>
        {editable ? editableLinks : !post.sold ? messageSeller : null}
      </Card.Body>
    </Card>
  )
}

export default PostCard
