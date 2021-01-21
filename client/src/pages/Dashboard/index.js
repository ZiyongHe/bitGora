import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PostCard from '../../components/PostCard'
import { getAllPosts } from '../../utils/post-API'

function Dashboard() {
  const [allPosts, setAllPosts] = useState({
    posts: [],
    err: '',
  })

  useEffect(() => {
    getAllPosts()
      .then((result) => {
        if (result.err) {
          setAllPosts((prevState) => ({
            ...prevState,
            err: result.err,
          }))
        } else {
          setAllPosts({
            posts: result.data,
            err: '',
          })
        }
      })
      .catch(() => {
        setAllPosts((prevState) => ({
          ...prevState,
          err: 'Something went wrong. Unable to load posts at this time.',
        }))
      })
  }, [])

  useEffect(() => {
    console.log(allPosts)
  }, [allPosts])

  return (
    <Container>
      <Row>
        <Col>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row>
        {allPosts.posts.map((post) => (
          <Col xs={12} md={6}>
            <PostCard post={post} editable={true} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Dashboard
