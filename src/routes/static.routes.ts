import { Router } from 'express'
import {
  serveImageController,
  serveVideoStreamController,
  serveSegmentController,
  serveM3U8Controller
} from '~/controllers/media.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video-stream/:name', serveVideoStreamController)
staticRouter.get('/video-hls/:id', serveM3U8Controller)
staticRouter.get('/video-hls/:id/:v/:segment', serveSegmentController)

export default staticRouter
