import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { useUser } from '../../utils/UserContext'
import { useHistory } from 'react-router-dom'
import { useChat } from '../../utils/ChatContext'

import './index.css'

const ChatRoomList = () => {
  const [user] = useUser()
  const { chats } = useChat()
  let history = useHistory()

  function enterRoomBtn(roomId) {
    return history.push(`/user/chat/room/${roomId}`)
  }

  return (
    <Container className="mt-4 pb-5">
      <Row>
        <Col>
          <h1 className="mb-3">Messages</h1>
        </Col>
      </Row>
      {chats.map((room) => (
        <Row key={room._id}>
          <Col>
            <Card className="border-right-0 border-left-0 border-bottom-0 rounded-0">
              <button
                onClick={() => enterRoomBtn(room._id)}
                className="btn btn-enter-chat"
              >
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <Card.Title className="mb-0 d-flex align-items-center">
                    <i className="fas fa-user-circle mr-3 message-icon"></i>
                    {room.members[0] === user.username
                      ? room.members[1]
                      : room.members[0]}
                  </Card.Title>
                  <i className="fas fa-chevron-right"></i>
                </Card.Body>
              </button>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  )
}

export default ChatRoomList
