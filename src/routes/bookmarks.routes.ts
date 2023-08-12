import { create } from 'axios'
import { Router } from 'express'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { bookmarkTweetController, unBookmarkTweetController } from '~/controllers/bookmark.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'

const bookmarkRouter = Router()

/**
 * Description. Create a new bookmark
 * Path: /bookmarks
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { tweet_id: string }
 */
bookmarkRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(bookmarkTweetController)
)

/**
 * Description. Un bookmark a tweet
 * Path: /bookmarks/tweets/:tweet_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarkRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unBookmarkTweetController)
)

/**
 * Description. Un bookmark a tweet
 * Path: /bookmarks/:bookmark_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

export default bookmarkRouter
