const express = require('express')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')
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

// For sessions
app.use(
  session({
    secret: 'fdhs397y2y539n',
    resave: true,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Define API routes here
app.use('/user', require('./routes/user-routes.js'))

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})
