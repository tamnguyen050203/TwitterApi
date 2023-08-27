import { config } from 'dotenv'
import express from 'express'
import { UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { defaultErrorHandler } from '~/middlewares/error.middlewares'
import mediasRouter from '~/routes/media.routes'
import staticRouter from '~/routes/static.routes'
import usersRouter from '~/routes/user.routes'
import databaseService from '~/services/database.services'
import { initFolder } from '~/utils/file'
import cors, { CorsOptions } from 'cors'
import tweetsRouter from '~/routes/tweets.routes'
import bookmarksRouter from '~/routes/bookmarks.routes'
import searchRouter from '~/routes/search.routes'
import { createServer } from 'http'
import conversationsRouter from '~/routes/conversations.routes'
import initSocket from './utils/socket'
import { envConfig, isProduction } from './constants/config'
import YAML from 'yaml'
import helmet from 'helmet'
// import fs from 'fs'
// import path from 'path'
import swaggerUI from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import rateLimit from 'express-rate-limit'
// const file = fs.readFileSync(path.resolve('twitter-swagger.yaml'), 'utf8')

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0'
    }
    // components: {
    //   securitySchemes: {
    //     BearerAuth: {
    //       type: 'http',
    //       scheme: 'bearer',
    //       bearerFormat: 'JWT'
    //     }
    //   }
    // }
  },
  apis: ['./twitter-swagger.yaml']
  // apis: ['./src/routes/*.routes.ts', './src/models/requests/*.requests.ts'] // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options)

// const swaggerDocument = YAML.parse(file)

config()
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})
const app = express()
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
})
app.use(limiter)
const httpServer = createServer(app)
app.use(helmet())
const corsOptions: CorsOptions = {
  origin: isProduction ? envConfig.clientUrl : '*'
}
app.use(cors(corsOptions))
const port = envConfig.port || 3066

// Tạo folder upload
initFolder()
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
// app.use('/likes', likesRouter)
app.use('/search', searchRouter)
app.use('/conversations', conversationsRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use(defaultErrorHandler)
initSocket(httpServer)

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
