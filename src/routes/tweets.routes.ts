import { Router } from 'express'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { createTweetController } from '~/controllers/tweet.controllers'
import { createTweetValidator } from '~/middlewares/tweets.middlewares'

const tweetsRouter = Router()

/**
 * Description. Create a new tweet
 * Path: /tweets
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { TweetRequestBody }
 */
tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

export default tweetsRouter
