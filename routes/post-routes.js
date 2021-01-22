const router = require('express').Router()
const mongoose = require('mongoose')
const { Post } = require('../models')
const isAuthenticated = require('../config/middleware/isAuthenticated')

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).send({ data: posts })
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

router.get('/unowned', isAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find({})
    const unownedPosts = posts.filter(
      (post) => post.userName !== req.user.username
    )
    res.status(200).send({ data: unownedPosts })
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

router.get('/owned', isAuthenticated, async (req, res) => {
  try {
    const ownedPosts = await Post.find({ userName: req.user.username })
    res.status(200).send({ data: ownedPosts })
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body)
    res.status(201).send({ data: newPost })
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

router.put('/', async (req, res) => {
  try {
    const _id = mongoose.Types.ObjectId(req.body._id)
    const post = await Post.find({ _id })
    if (post.length === 0) {
      return res.status(404).send({ err: 'Post listing not found.' })
    }
    Post.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (_, result) => {
        res.status(200).send({ data: result })
      }
    )
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const _id = mongoose.Types.ObjectId(req.params.id)
    const post = await Post.find({
      _id,
    })
    if (post.length === 0) {
      return res.status(404).send({ err: 'Post listing not found.' })
    }
    await Post.deleteOne({ _id })
    res.status(200).send({ data: post })
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

module.exports = router
