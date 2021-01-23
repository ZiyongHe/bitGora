const express = require('express')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bitgora', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB database!')
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB ...`, err.message)
    process.exit(1)
  })

const app = express()

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
app.use('/chat', require('./routes/message-routes.js'))

// This is a fall-back for development mode.
// Send every other request to the React app.
// Define all other valid API routes before this one.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// Create the http server with the Express app as the route handlers
const httpServer = http.createServer(app)

// Pass the http server to socket.io
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
})

const Message = require('./models/Message')
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'
io.on('connection', (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query
  socket.join(roomId)

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, async (data) => {
    // Save to database
    const newMessage = new Message({ username: data.username, body: data.body })
    await newMessage.save()
    // Broadcast back to all connected clients
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, newMessage.toJSON())
  })

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    socket.leave(roomId)
  })
})

// Start the HTTP server listing for requests
const PORT = process.env.PORT || 3001
httpServer.on('listening', () =>
  console.log(`🌎 ==> API server now on port ${PORT}!`)
)
httpServer.listen(PORT)
