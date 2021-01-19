import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ChatRoom from './../Chatroom/ChatRoom'

import './Chat.css'

const Chat = () => {
  const [roomNumber, setRoomNumber] = React.useState('')
  const [submitRoomNumber, setSubmitRoomNumber] = React.useState('')
  const handleroomNumberChange = (event) => {
    setRoomNumber(event.target.value)
  }

  const handleEnterButton = (e) => {
    setSubmitRoomNumber(roomNumber)
    setRoomNumber('')
  }

  return (
    <>
      <Form className="home-container">
        <input
          type="text"
          placeholder="Room"
          // value={roomNumber}
          onChange={handleroomNumberChange}
          className="text-input-field"
        />
        <Button onClick={handleEnterButton} className="enter-room-button">
          Join room
        </Button>
      </Form>
      <ChatRoom roomNumber={submitRoomNumber} />
    </>
  )
}

export default Chat
