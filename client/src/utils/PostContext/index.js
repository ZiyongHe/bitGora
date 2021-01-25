import React, { useReducer, createContext, useContext, useEffect } from 'react'
import {
  SET_UNOWNED_POSTS,
  SET_OWNED_POSTS,
  DELETE_OWNED_POST,
  SET_ERR,
} from './actions.js'
import { deletePost, getUnownedPosts } from '../post-API.js'

const PostContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case SET_UNOWNED_POSTS:
      return { ...state, err: '', unownedPosts: action.unownedPosts }
    case SET_OWNED_POSTS:
      return { ...state, err: '', ownedPosts: action.ownedPosts }
    case DELETE_OWNED_POST:
      return {
        ...state,
        err: '',
        ownedPosts: state.ownedPosts.filter(
          (ownedPost) => ownedPost._id !== action._id
        ),
      }
    case SET_ERR:
      return { ...state, err: action.err }
    default:
      throw new Error(`Invalid Post dispatch action: ${action.type}`)
  }
}

export function PostProvider(props) {
  const [posts, dispatch] = useReducer(reducer, {
    unownedPosts: [],
    ownedPosts: [],
    err: '',
  })

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
  }, [])

  const handleDelete = (id, callback) => {
    deletePost(id)
      .then((response) => {
        if (response.err) {
          dispatch({ type: SET_ERR, err: response.err })
        } else {
          dispatch({ type: DELETE_OWNED_POST, _id: id })
          callback()
        }
      })
      .catch(() => {
        dispatch({
          type: SET_ERR,
          err: 'Something went wrong. Unable to delete post at this time.',
        })
      })
  }

  return (
    <PostContext.Provider
      value={{ posts, dispatch, handleDelete }}
      {...props}
    />
  )
}

export function usePost() {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error(
      'usePost must be called from a descendent from PostProvider'
    )
  }

  return context
}
