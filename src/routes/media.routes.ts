import { Router } from 'express'
import { uploadSingleImage } from '../controllers/media.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const mediaRouter = Router()

mediaRouter.post('/upload-image', wrapRequestHandler(uploadSingleImage))

export default mediaRouter
