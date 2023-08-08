import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'
import { MEDIA_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadSingleImage = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.handleUploadSingleImage(req)
  return res.status(200).json({
    message: MEDIA_MESSAGES.UPLOAD_SUCCESSFUL,
    result: url
  })
}

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  return res.sendFile(path.join(UPLOAD_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).json({
        message: MEDIA_MESSAGES.NOT_FOUND
      })
    }
  })
}
