import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { SEARCH_MESSAGES } from '~/constants/messages'
import { SearchQuery } from '~/models/requests/Search.requests'
import searchServices from '~/services/search.services'

export const searchController = async (req: Request<ParamsDictionary, any, any, SearchQuery>, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const content = req.query.content
  const user_id = req.decoded_authorization?.user_id as string
  const media_type = req.query.media_type
  const result = await searchServices.search({
    limit,
    page,
    content,
  media_type,
    user_id
  })
  res.json({
    message: SEARCH_MESSAGES.SEARCH_SUCCESSFULLY,
    result: {
      tweets: result.tweets,
      limit,
      page,
      total_page: Math.ceil(result.total / limit)
    }
  })
}
