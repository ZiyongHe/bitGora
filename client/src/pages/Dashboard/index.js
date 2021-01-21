import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PostCard from '../../components/PostCard'
import { useUser } from '../../utils/UserContext'
import { usePost } from '../../utils/PostContext'
import { SET_ALL_POSTS, SET_ERR } from '../../utils/PostContext/actions'
import { getAllPosts } from '../../utils/post-API'
import { markOwnedPosts } from '../../utils/post-formatter'

function Dashboard() {
  const [posts, dispatch] = usePost()
  const [user] = useUser()

  useEffect(() => {
    getAllPosts()
      .then((result) => {
        if (result.err) {
          dispatch({ type: SET_ERR, err: result.err })
        } else {
          dispatch({
            type: SET_ALL_POSTS,
            allPosts: markOwnedPosts(user.username, result.data),
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

  useEffect(() => {
    console.log(posts)
  }, [posts])

  return (
    <Container>
      <Row>
        <Col>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row>
        {posts.allPosts.map((post) => (
          <Col xs={12} md={6} key={post.postData._id}>
            <PostCard post={post.postData} editable={post.owned} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Dashboard
