import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { MEDIA_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const urls = await mediasService.handleUploadImage(req)
  return res.status(200).json({
    message: MEDIA_MESSAGES.UPLOAD_SUCCESSFUL,
    result: urls
  })
}

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  return res.sendFile(path.join(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).json({
        message: MEDIA_MESSAGES.NOT_FOUND
      })
    }
  })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const urls = await mediasService.handleUploadVideo(req)
  return res.status(200).json({
    message: MEDIA_MESSAGES.UPLOAD_SUCCESSFUL,
    result: urls
  })
}

export const serveVideoController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  return res.sendFile(path.join(UPLOAD_VIDEO_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).json({
        message: MEDIA_MESSAGES.NOT_FOUND
      })
    }
  })
}
