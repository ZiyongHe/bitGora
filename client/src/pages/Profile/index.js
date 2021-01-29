import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PostCard from '../../components/PostCard'
import { usePost } from '../../utils/PostContext'

function Profile() {
  const { posts } = usePost()

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-3">Profile</h1>
        </Col>
      </Row>
      <Row>
        {posts.ownedPosts.map((post) => (
          <Col xs={12} md={6} key={post._id}>
            <PostCard post={post} editable={true} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Profile
