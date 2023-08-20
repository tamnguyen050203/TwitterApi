import { checkSchema } from 'express-validator'
import { MediaTypeQuery } from '~/constants/enums'
import { SEARCH_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const searchValidator = validate(
  checkSchema(
    {
      content: {
        trim: true,
        isString: true
      },
      media_type: {
        custom: {
          options: (value) => {
            if (value && ![MediaTypeQuery.Image, MediaTypeQuery.Video].includes(value)) {
              throw new Error(SEARCH_MESSAGES.MEDIA_TYPE_INVALID)
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)
