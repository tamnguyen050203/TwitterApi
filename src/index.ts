import express from 'express'
import userRouter from '~/routes/user.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediaRouter from './routes/media.routes'
import { initFolder } from './utils/file'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from './constants/dir'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'
import cors from 'cors'
import tweetRouter from './routes/tweets.routes'
import bookmarkRouter from './routes/bookmarks.routes'
import searchRouter from './routes/search.routes'
import '~/utils/s3'
import { createServer } from 'http'
import { Server } from 'socket.io'

config()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})

const app = express()
const httpServer = createServer(app)
app.use(cors())
const port = process.env.PORT || 3066

// Crate folder
initFolder(UPLOAD_IMAGE_TEMP_DIR)
initFolder(UPLOAD_VIDEO_TEMP_DIR)

app.use(express.json())
app.use('/users', userRouter)
app.use('/medias', mediaRouter)
app.use('/static', staticRouter)
app.use('/tweets', tweetRouter)
app.use('/search', searchRouter)
app.use('/bookmarks', bookmarkRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

app.use(defaultErrorHandler)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3050'
  }
})
const users: {
  [key: string]: {
    socket_id: string
  }
} = {}
io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)
  const user_id = socket.handshake.auth._id
  users[user_id] = {
    socket_id: socket.id
  }
  console.log(users)
  socket.on('private message', (data) => {
    const receiver_socket_id = users[data.to].socket_id
    socket.to(receiver_socket_id).emit('receive private message', {
      content: data.content,
      from: user_id
    })
  })
  socket.on('disconnect', () => {
    delete users[user_id]
    console.log(`user ${socket.id} disconnected`)
    console.log(users)
  })
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
