const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bitgora', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to database!')
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

// Define middleware here
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})
