import { checkSchema } from 'express-validator'
import { BOOKMARK_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const bookmarkTweetValidator = validate(
  checkSchema({
    tweet_id: {
      custom: {
        options: (value) => {
          if (!value) {
            throw new Error(BOOKMARK_MESSAGES.TWEET_ID_REQUIRED)
          }

          return true
        }
      }
    }
  })
)
