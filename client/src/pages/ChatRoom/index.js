import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../utils/UserContext'
import { useChat } from '../../utils/ChatContext'
import { getMessage } from '../../utils/message-API'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './index.css'

const ChatRoom = () => {
  // use the activeRoom state from useChat
  const [user] = useUser()
  const { id } = useParams()
  const { sendMessage, activeRoom, setActiveRoom } = useChat()
  const [newMessage, setNewMessage] = useState('') // Message to be sent

  useEffect(() => {
    getMessage(id).then((res) => {
      console.log(res)
      setActiveRoom(res)
      window.scrollTo(0, document.body.scrollHeight)
    })
  }, [id])

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    sendMessage(newMessage, id)
    setNewMessage('')
  }

  return (
    <>
      <Container>
        <Row id="chatroom-title" className="sticky-top border-bottom">
          <Col>
            <h1 className="my-3">
              {activeRoom && activeRoom.members[0] === user.username
                ? activeRoom.members[1]
                : activeRoom.members[0]}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul className="messages-list">
              {activeRoom
                ? activeRoom.messages.map((message, i) => (
                    <li
                      key={i}
                      className={`message-item ${
                        message.ownedByCurrentUser
                          ? 'my-message'
                          : 'received-message'
                      }`}
                    >
                      {message.body}
                    </li>
                  ))
                : null}
            </ul>
          </Col>
        </Row>
      </Container>
      <div id="message-form">
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSendMessage}>
                <Form.Group id="message-group">
                  <Form.Control
                    id="message-area"
                    as="textarea"
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Write message..."
                    className="new-message-input-field"
                  />
                  <Button
                    id="btn-send-message"
                    variant="warning"
                    onClick={handleSendMessage}
                    className="send-message-button"
                  >
                    Send
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default ChatRoom
