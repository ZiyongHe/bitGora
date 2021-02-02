import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PostCard from '../../components/PostCard'
import { usePost } from '../../utils/PostContext'

function Dashboard() {
  const { posts } = usePost()

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-3">Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card-columns">
            {posts.unownedPosts.map((post) => (
              <PostCard key={post._id} post={post} editable={false} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
