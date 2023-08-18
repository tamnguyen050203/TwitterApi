import { NextFunction, Request, Response } from 'express'
import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import tweetService from '~/services/tweet.services'
import { TWEET_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/models/requests/User.requests'
import { TweetType } from '~/constants/enums'

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

export const getTweetController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await tweetService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views,
    updated_at: result.updated_at
  }
  return res.json({ message: TWEET_MESSAGES.GET_TWEET_SUCCESSFUL, result: tweet })
}

export const getTweetChildrenController = async (req: Request, res: Response, next: NextFunction) => {
  const tweet_type = Number(req.query.tweet_type as string) as TweetType
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)
  const user_id = req.decoded_authorization?.user_id

  const { total, tweets } = await tweetService.getTweetChildren({
    tweet_id: req.params.tweet_id,
    tweet_type,
    limit,
    page,
    user_id
  })
  return res.json({
    message: TWEET_MESSAGES.GET_TWEET_CHILDREN_SUCCESSFUL,
    result: {
      tweets,
      tweet_type,
      limit,
      page,
      total_page: Math.ceil(total / limit)
    }
  })
}
