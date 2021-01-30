import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Form'
import { getChatRoom } from '../../utils/message-API'
import { useUser } from '../../utils/UserContext'
import { useHistory } from 'react-router-dom'
import { useChat } from '../../utils/ChatContext'

import './index.css'

const ChatRoomList = () => {
  const [user] = useUser()
  const { chats } = useChat()
  // const [list, setList] = useState([])
  let history = useHistory()

  // useEffect(() => {
  //   getChatRoom(user.username).then((res) => setList(res))
  // }, [])

  function enterRoomBtn(roomId) {
    return history.push(`/user/chat/room/${roomId}`)
  }

  return (
    <Container>
      {chats.map((room) => (
        <Row>
          {room.members[0] === user.username
            ? room.members[1]
            : room.members[0]}
          <Button onClick={() => enterRoomBtn(room._id)}>Enter</Button>
        </Row>
      ))}
    </Container>
  )
}

export default ChatRoomList
