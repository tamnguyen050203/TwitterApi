import { Router } from 'express'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { createTweetController, getTweetDetailController } from '~/controllers/tweet.controllers'
import { createTweetValidator, tweetIdValidator } from '~/middlewares/tweets.middlewares'

const tweetRouter = Router()

/**
 * Description. Create a new tweet
 * Path: /tweets
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { TweetRequestBody }
 */
tweetRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

/**
 * Description. Get detail of a tweet
 * Path: /tweets/:tweet_id
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 */
tweetRouter.get('/:tweet_id', tweetIdValidator, wrapRequestHandler(getTweetDetailController))

export default tweetRouter
