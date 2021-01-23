import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PostCard from '../../components/PostCard'
import { usePost } from '../../utils/PostContext'
import { SET_OWNED_POSTS, SET_ERR } from '../../utils/PostContext/actions'
import { getOwnedPosts } from '../../utils/post-API'

function Profile() {
  const { posts, dispatch } = usePost()

  useEffect(() => {
    getOwnedPosts()
      .then((result) => {
        if (result.err) {
          dispatch({ type: SET_ERR, err: result.err })
        } else {
          dispatch({
            type: SET_OWNED_POSTS,
            ownedPosts: result.data,
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
          <h1>Profile</h1>
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
