import { Router } from 'express'
import { uploadImage } from '../controllers/media.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

const mediaRouter = Router()

mediaRouter.post('/upload-image', wrapRequestHandler(uploadImage))

export default mediaRouter
