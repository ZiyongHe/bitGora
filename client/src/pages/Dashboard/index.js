import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PostCard from '../../components/PostCard'
import { usePost } from '../../utils/PostContext'
import { SET_UNOWNED_POSTS, SET_ERR } from '../../utils/PostContext/actions'
import { getUnownedPosts } from '../../utils/post-API'

function Dashboard() {
  const { posts, dispatch } = usePost()

  useEffect(() => {
    getUnownedPosts()
      .then((result) => {
        if (result.err) {
          dispatch({ type: SET_ERR, err: result.err })
        } else {
          dispatch({
            type: SET_UNOWNED_POSTS,
            unownedPosts: result.data,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: SET_ERR,
          err: 'Something went wrong. Unable to load new posts at this time.',
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
