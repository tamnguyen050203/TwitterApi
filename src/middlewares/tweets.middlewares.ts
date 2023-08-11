import { checkSchema } from 'express-validator'
import { isEmpty } from 'lodash'
import { ObjectId } from 'mongodb'
import { MediaType, TweetAudience, TweetType } from '~/constants/enums'
import { TWEET_MESSAGES } from '~/constants/messages'
import { numberEnumToArray } from '~/utils/commons'
import { validate } from '~/utils/validation'

const tweetType = numberEnumToArray(TweetType)
const tweetAudience = numberEnumToArray(TweetAudience)
const mediaType = numberEnumToArray(MediaType)

export const createTweetValidator = validate(
  checkSchema(
    {
      type: {
        isIn: {
          options: [tweetType],
          errorMessage: TWEET_MESSAGES.INVALID_TYPE
        }
      },
      audience: {
        isIn: {
          options: [tweetAudience],
          errorMessage: TWEET_MESSAGES.INVALID_AUDIENCE
        }
      },
      parent_id: {
        custom: {
          options: (value, { req }) => {
            const type = req.body.type as TweetType

            // if type is retweet, comment or quote tweet, parent_id must be a valid tweet id
            if (
              [TweetType.Retweet, TweetType.Comment, TweetType.QuoteTweet].includes(type) &&
              !ObjectId.isValid(value)
            ) {
              throw new Error(TWEET_MESSAGES.PARENT_ID_MUST_BE_A_VALID_TWEET_ID)
            }

            // if type is root tweet, parent_id must be null
            if (type === TweetType.Tweet && value !== null) {
              throw new Error(TWEET_MESSAGES.PARENT_ID_MUST_BE_NULL)
            }

            return true
          }
        }
      },
      content: {
        isString: true,
        custom: {
          options: (value, { req }) => {
            const type = req.body.type as TweetType
            const hashtags = req.body.hashtags as string[]
            const mentions = req.body.mentions as string[]

            // if type is retweet, content must be '
            if (type === TweetType.Retweet && value !== '') {
              throw new Error(TWEET_MESSAGES.CONTENT_MUST_BE_EMPTY)
            }

            // if type is comment, quote tweet, tweet and have no mention, hashtags, content must be string with length > 0
            if (
              [TweetType.Comment, TweetType.QuoteTweet, TweetType.Tweet].includes(type) &&
              isEmpty(hashtags) &&
              isEmpty(mentions) &&
              value === ''
            ) {
              throw new Error(TWEET_MESSAGES.CONTENT_MUST_BE_A_NON_EMPTY_STRING)
            }

            return true
          }
        }
      },
      hashtags: {
        isArray: true,
        custom: {
          options: (value, { req }) => {
            console.log(
              value.every((element: any) => {
                console.log(typeof element)
                return typeof element === 'string'
              })
            )
            // Require every element must be string
            if (!value.every((element: any) => typeof element === 'string')) {
              throw new Error(TWEET_MESSAGES.HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING)
            }

            return true
          }
        }
      },
      mentions: {
        isArray: true,
        custom: {
          options: (value, { req }) => {
            // Require every element must be user_id
            if (!value.every((element: any) => ObjectId.isValid(element))) {
              throw new Error(TWEET_MESSAGES.MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID)
            }

            return true
          }
        }
      },
      medias: {
        isArray: true,
        custom: {
          options: (value, { req }) => {
            // Require every element must be Media object
            if (
              !value.every((element: any) => {
                return (
                  element &&
                  typeof element === 'object' &&
                  ObjectId.isValid(element._id) &&
                  mediaType.includes(element.type)
                )
              })
            ) {
              throw new Error(TWEET_MESSAGES.MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT)
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)
