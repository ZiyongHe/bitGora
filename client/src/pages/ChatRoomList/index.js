import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Form'
import { getChatRoom } from '../../utils/message-API'
import { useUser } from '../../utils/UserContext'

import './index.css'

const ChatRoomList = () => {
  const [user] = useUser()
  const [list, setList] = useState([])

  useEffect(() => {
    getChatRoom(user.username).then((res) => setList(res))
  }, [])

  return (
    <Container>
      <h1>test</h1>
      {list.map((room) => (
        <Row>
          {room.members[0] === user.username
            ? room.members[1]
            : room.members[0]}
          <Button>Enter</Button>
        </Row>
      ))}
    </Container>
  )
}

export default ChatRoomList
