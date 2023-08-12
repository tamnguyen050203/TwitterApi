import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import databaseService from './database.services'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId } from 'mongodb'
import hashtagService from './hashtag.services'

class TweetService {
  async createTweet({ user_id, body }: { user_id: string; body: TweetRequestBody }) {
    const hashtags = await hashtagService.checkAndCreateHashtag(body.hashtags as string[])
    const result = await databaseService.tweets.insertOne(
      new Tweet({
        user_id: new ObjectId(user_id),
        type: body.type,
        audience: body.audience,
        content: body.content,
        parent_id: body.parent_id,
        hashtags,
        mentions: body.mentions,
        medias: body.medias,
        created_at: new Date(),
        updated_at: new Date()
      })
    )

    const tweet = await databaseService.tweets.findOne({ _id: result.insertedId })

    return tweet
  }
}

const tweetService = new TweetService()
export default tweetService
