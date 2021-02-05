const router = require('express').Router()
const mongoose = require('mongoose')
const { Post } = require('../models')
const cloudinary = require('cloudinary').v2
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

router.get('/view/:id', isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(400).send({ err: 'Post listing not found.' })
    }

    res.status(200).send({
      data: {
        postData: post,
        isOwned: post.userName === req.user.username,
      },
    })
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

router.post('/', isAuthenticated, async (req, res) => {
  try {
    // console.log(req.body) <-- post text
    // console.log(req.files) <-- image file
    const imagePath = req.files.image.path
    cloudinary.uploader.upload(imagePath, async function (err, result) {
      if (err) {
        console.log('Missing Cloudinary environment variable...')
        res.status(500).send({ err: err.message })
      } else {
        const image = { publicId: result.public_id, url: result.url }
        const post = {
          ...req.body,
          image,
          userName: req.user.username,
          userEmail: req.user.email,
        }
        const newPost = await Post.create(post)
        res.status(201).send({ data: newPost })
      }
    })
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

router.patch('/', isAuthenticated, async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(req.files)
    const post = await Post.findById(req.body._id)
    if (!post) {
      return res.status(404).send({ err: 'Post listing not found.' })
    }
    let postChanges = { ...req.body }
    // means that user would like to update the image
    if (req.files.image.size > 0) {
      // if uploading a new image, must destroy old image
      cloudinary.uploader.destroy(
        post.image.publicId,
        async function (err, result) {
          if (err) {
            return res.status(500).send({ err: err.message })
          }

          // gets path of the new image
          const imagePath = req.files.image.path
          // uploads the new image
          cloudinary.uploader.upload(imagePath, async function (err, result) {
            if (err) {
              return res.status(500).send({ err: err.message })
            }
            // save image references to the post changes
            const image = { publicId: result.public_id, url: result.url }
            postChanges = {
              ...postChanges,
              image,
            }

            // make update
            const newPost = await Post.findByIdAndUpdate(
              postChanges._id,
              postChanges,
              { new: true }
            )
            res.status(200).send({ data: newPost })
          })
        }
      )
    } else {
      // if no new image, just use the body
      // make update
      const newPost = await Post.findByIdAndUpdate(
        postChanges._id,
        postChanges,
        { new: true }
      )
      res.status(200).send({ data: newPost })
    }
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).send({ err: 'Post listing not found.' })
    }
    // delete image from cloudinary
    cloudinary.uploader.destroy(post.image.publicId, async function (err) {
      if (err) {
        res.status(500).send({ err: err.message })
      } else {
        // then delete post
        await Post.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        res.status(200).send({ data: post })
      }
    })
  } catch (err) {
    res.status(500).send({ err: err.message })
  }
})

module.exports = router
