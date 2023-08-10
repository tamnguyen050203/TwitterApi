import { Router } from 'express'
import {
  uploadImageController,
  uploadVideoController,
  uploadVideoHLSController,
  videoStatusController
} from '../controllers/media.controllers'
import { wrapRequestHandler } from '~/utils/handlers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'

const mediaRouter = Router()

/**
 * Description. Upload images
 * Path: /medias/upload-image
 * Method: POST
 * Header: { Authorization: Bearer <access_token>, verified: true }
 * Body: FormData { image: Files }
 */
mediaRouter.post(
  '/upload-image',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadImageController)
)

/**
 * Description. Upload one video
 * Path: /medias/upload-video
 * Method: POST
 * Header: { Authorization: Bearer <access_token>, verified: true }
 * Body: FormData { video: File }
 */
mediaRouter.post(
  '/upload-video',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoController)
)

/**
 * Description. Upload one video HLS
 * Path: /medias/upload-video-hls
 * Method: POST
 * Header: { Authorization: Bearer <access_token>, verified: true }
 * Body: FormData { video: File }
 */
mediaRouter.post(
  '/upload-video-hls',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoHLSController)
)

/**
 * Description. Upload one video HLS
 * Path: /medias/upload-video-hls
 * Header: { Authorization: Bearer <access_token>, verified: true }
 * Body: FormData { video: File }
 */
mediaRouter.get(
  '/video-status/:id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(videoStatusController)
)

export default mediaRouter
