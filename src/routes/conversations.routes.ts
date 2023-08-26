import { Router } from 'express'
import { accessTokenValidator, verifiedUserValidator, getConversationsValidator } from '~/middlewares/users.middlewares'
import { getConversationsController } from '~/controllers/conversation.controller'
import { paginationValidator } from '~/middlewares/tweets.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const conversationsRouter = Router()

/**
 * Description. Retrieve conversations
 * Path: /conversations/receivers/:receiverId
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { limit: number, page: number }
 * Params: { receiverId: string }
 */
conversationsRouter.get(
  '/receivers/:receiver_id',
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  getConversationsValidator,
  wrapRequestHandler(getConversationsController)
)

export default conversationsRouter
