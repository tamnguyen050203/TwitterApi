import { Router } from 'express'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import {
  createTweetController,
  getTweetChildrenController,
  getTweetController,
  getNewFeedsController
} from '~/controllers/tweet.controllers'
import {
  audienceValidator,
  createTweetValidator,
  getTweetChildrenValidator,
  paginationValidator,
  tweetIdValidator
} from '~/middlewares/tweets.middlewares'

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
tweetRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetController)
)

/**
 * Description. Get Tweet Children
 * Path: /tweets/:tweet_id/children
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 * Query: { page?: number, limit?: number, tweet_type: TweetType }
 */
tweetRouter.get(
  '/:tweet_id/children',
  tweetIdValidator,
  paginationValidator,
  getTweetChildrenValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetChildrenController)
)

/**
 * Description. Get new feeds
 * Path: /tweets
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { page: number, limit: number }
 */
tweetRouter.get(
  '/',
  paginationValidator,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(getNewFeedsController)
)

export default tweetRouter
