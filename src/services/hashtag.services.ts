import Hashtag from '~/models/schemas/Hashtag.schema'
import databaseService from './database.services'
import { WithId } from 'mongodb'

class HashtagService {
  async checkAndCreateHashtag(hashtags: string[]) {
    const hashtagDocuments = await Promise.all(
      hashtags.map(async (hashtag) => {
        // Check if hashtag exists in database and create if not
        return await databaseService.hashtags.findOneAndUpdate(
          { name: hashtag },
          {
            $setOnInsert: new Hashtag({
              name: hashtag
            })
          },
          {
            upsert: true,
            returnDocument: 'after'
          }
        )
      })
    )

    return hashtagDocuments.map((hashtag) => (hashtag.value as WithId<Hashtag>)._id)
  }

  async createHashtag({ names }: { names: string[] }) {
    const hashtags = await this.checkAndCreateHashtag(names)
    const result = names.map(async (name) => {
      await databaseService.hashtags.insertOne(
        new Hashtag({
          name,
          created_at: new Date()
        })
      )
    })
  }
}

const hashtagService = new HashtagService()
export default hashtagService
