import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { viewPost } from '../../utils/post-API'

function ViewPost() {
  const { id } = useParams()
  const [post, setPost] = useState({
    postData: {
      userName: '',
      userEmail: '',
      name: '',
      image: '',
      description: '',
      price: '',
      createdAt: '',
      sold: false,
    },
    isOwned: false,
  })
  const [err, setErr] = useState('')

  useEffect(() => {
    viewPost(id)
      .then((response) => {
        if (response.err) {
          setErr(response.err)
        } else {
          setPost(response.data)
        }
      })
      .catch(() => {
        setErr('Something went wrong. Cannot view post data.')
      })
  }, [])

  return <h1>{post.postData.name}</h1>
}

export default ViewPost
