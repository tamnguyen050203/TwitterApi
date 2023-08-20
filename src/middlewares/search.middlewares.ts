import { error } from 'console'
import { checkSchema } from 'express-validator'
import { MediaTypeQuery, PeopleFollow } from '~/constants/enums'
import { SEARCH_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const searchValidator = validate(
  checkSchema(
    {
      content: {
        trim: true,
        isString: {
          errorMessage: SEARCH_MESSAGES.CONTENT_INVALID
        }
      },
      media_type: {
        optional: true,
        isIn: {
          options: [Object.values(MediaTypeQuery)]
        },
        errorMessage: SEARCH_MESSAGES.MEDIA_TYPE_INVALID
      },
      people_follow: {
        optional: true,
        isIn: {
          options: [Object.values(PeopleFollow)],
          errorMessage: SEARCH_MESSAGES.PEOPLE_FOLLOW_INVALID
        }
      }
    },
    ['query']
  )
)
