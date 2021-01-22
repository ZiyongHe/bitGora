import React, { useReducer, createContext, useContext } from 'react'
import { SET_UNOWNED_POSTS, SET_OWNED_POSTS, SET_ERR } from './actions.js'

const PostContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case SET_UNOWNED_POSTS:
      return { ...state, err: '', unownedPosts: action.unownedPosts }
    case SET_OWNED_POSTS:
      return { ...state, err: '', ownedPosts: action.ownedPosts }
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

  return <PostContext.Provider value={[posts, dispatch]} {...props} />
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
