import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PostCard from '../../components/PostCard'
import { usePost } from '../../utils/PostContext'

function Dashboard() {
  const { posts } = usePost()

  return (
    <Container>
      <Row>
        <Col>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row>
        {posts.unownedPosts.map((post) => (
          <Col xs={12} md={6} key={post._id}>
            <PostCard post={post} editable={false} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Dashboard
