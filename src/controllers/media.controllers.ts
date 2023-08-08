import { NextFunction, Request, Response } from 'express'
import path from 'path'
import mediasService from '~/services/medias.services'

export const uploadSingleImage = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediasService.handleUploadSingleImage(req)
  return res.status(200).json({
    result: result
  })
}
