import { NextFunction, Request, Response } from 'express'
import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import tweetService from '~/services/tweet.services'
import { TWEET_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/models/requests/User.requests'

export const createTweetController = async (
  req: Request<ParamsDictionary, any, TweetRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetService.createTweet({
    user_id,
    body: req.body
  })
  return res.json({ message: TWEET_MESSAGES.CREATE_TWEET_SUCCESSFUL, result })
}

export const getTweetDetailController = async (req: Request, res: Response, next: NextFunction) => {
  // const { tweet_id } = req.params
  // const result = await tweetService.getTweetDetail(tweet_id)
  return res.json({ message: TWEET_MESSAGES.GET_TWEET_DETAIL_SUCCESSFUL, result: req.tweet })
}
