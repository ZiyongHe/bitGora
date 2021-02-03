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

const SHIFT_LEFT = 'ShiftLeft'
const SHIFT_RIGHT = 'ShiftRight'
const ENTER = 'Enter'

const ChatRoom = () => {
  // use the activeRoom state from useChat
  const [user] = useUser()
  const { id } = useParams()
  const { sendMessage, activeRoom, setActiveRoom } = useChat()
  const [newMessage, setNewMessage] = useState('') // Message to be sent
  // used for text box
  // if user is presseing shift and enter, then it will create a new line
  // but if user preses only enter, will send message (see functions below)
  const [keyPressed, setKeyPressed] = useState({
    [SHIFT_LEFT]: false,
    [SHIFT_RIGHT]: false,
    [ENTER]: false,
  })

  useEffect(() => {
    getMessage(id).then((res) => {
      console.log(res)
      setActiveRoom(res)
      window.scrollTo(0, document.body.scrollHeight)
    })
  }, [id])

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [activeRoom.messages])

  useEffect(() => {
    // creating new line
    if (
      (keyPressed[SHIFT_LEFT] || keyPressed[SHIFT_RIGHT]) &&
      keyPressed[ENTER]
    ) {
      setNewMessage((prevState) => prevState + '\n')
      // sending a message
    } else if (
      keyPressed[ENTER] &&
      !keyPressed[SHIFT_LEFT] &&
      !keyPressed[SHIFT_RIGHT]
    ) {
      handleSendMessage()
    }
  }, [keyPressed])

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    sendMessage(newMessage, id)
    setNewMessage('')
  }

  // setting state for shift and enter keys
  const handleKeyDown = (e) => {
    if (e.code === ENTER || e.code === SHIFT_LEFT || e.code === SHIFT_RIGHT) {
      if (e.code === ENTER) {
        e.preventDefault()
      }
      setKeyPressed((prevState) => ({ ...prevState, [e.code]: true }))
    }
  }

  // setting state for shift and enter keys
  const handleKeyUp = (e) => {
    if (e.code === ENTER || e.code === SHIFT_LEFT || e.code === SHIFT_RIGHT) {
      if (e.code === ENTER) {
        e.preventDefault()
      }
      setKeyPressed((prevState) => ({ ...prevState, [e.code]: false }))
    }
  }

  return (
    <>
      <Container className="flex-grow-1 d-flex flex-column">
        <Row id="chatroom-title" className="border-bottom py-3">
          <Col className="d-flex align-items-center">
            <i className="fas fa-user-circle mr-3 chatroom-icon"></i>
            <h1 className="mb-0">
              {activeRoom && activeRoom.members[0] === user.username
                ? activeRoom.members[1]
                : activeRoom.members[0]}
            </h1>
          </Col>
        </Row>
        <Row className="flex-grow-1">
          <Col className="d-flex flex-column justify-content-end">
            <ul id="message-list" className="mt-3">
              {activeRoom
                ? activeRoom.messages.map((message, i) => (
                    <li
                      key={i}
                      className={`message-item p-2 rounded ${
                        message.username === user.username
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
              <Form>
                <Form.Group id="message-group">
                  <Form.Control
                    id="message-area"
                    as="textarea"
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Write message..."
                    className="new-message-input-field"
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
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
