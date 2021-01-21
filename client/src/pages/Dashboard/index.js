import React, { useState, useEffect } from 'react'
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

  return <h1>Dashboard</h1>
}

export default Dashboard
