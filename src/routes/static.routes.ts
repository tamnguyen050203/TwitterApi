import { Router } from 'express'
import {
  serveImageController,
  serveVideoStreamController,
  serveSegmentController,
  serveM3u8Controller
} from '~/controllers/media.controllers'

const staticRouter = Router()

/**
 * Description. Serve image
 * Path: /static/image/:name
 * Method: GET
 */
staticRouter.get('/image/:name', serveImageController)

/**
 * Description. Serve video stream
 * Path: /static/video-stream/:name
 * Method: GET
 */
staticRouter.get('/video-stream/:name', serveVideoStreamController)

/**
 * Description. Serve video M3U8
 * Path: /static/video-hls/:id/master.m3u8
 * Method: GET
 */
staticRouter.get('/video-hls/:id/master.m3u8', serveM3u8Controller)

/**
 * Description. Serve segment
 * Path: /static/video-hls/:id/:v/:segment
 * Method: GET
 */
staticRouter.get('/video-hls/:id/:v/:segment', serveSegmentController)

export default staticRouter
