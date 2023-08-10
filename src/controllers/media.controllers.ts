import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { MEDIA_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'
import fs from 'fs'
import mime from 'mime'

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

export const serveVideoStreamController = (req: Request, res: Response, next: NextFunction) => {
  const range = req.headers.range
  if (!range) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send(MEDIA_MESSAGES.REQUIRED_RANGE_HEADER)
  }
  const { name } = req.params
  const videoPath = path.resolve(UPLOAD_VIDEO_DIR, name)

  // Size of the video
  const videoSize = fs.statSync(videoPath).size
  // Size of chunk we are sending back
  const chunkSize = 30 * 10 ** 6 // 1MB
  // Get start and end byte range from headers (bytes=32324-)
  const start = Number(range.replace(/\D/g, ''))

  /**
   * Format of header Content-Range: bytes <start>-<end>/<videoSize>
   * Example: Content-Range: bytes 1048576-3145727/3145728
   * Request that start always smaller than end
   * ❌ 'Content-Range': 'bytes 0-100/100'
   * ✅ 'Content-Range': 'bytes 0-99/100'
   *
   * ChunkSize = 50
   * videoSize = 100
   * |0----------------50|51----------------99|100 (end)
   * stream 1: start = 0, end = 50, contentLength = 51
   * stream 2: start = 51, end = 99, contentLength = 49
   */

  const end = Math.min(start + chunkSize, videoSize - 1)
  const contentLength = end - start + 1
  const contentType = mime.getType(videoPath) || 'video/*'

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': contentType
  }
  res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)
  const videoStream = fs.createReadStream(videoPath, { start, end })
  videoStream.pipe(res)
}

export const uploadVideoHLSController = async (req: Request, res: Response, next: NextFunction) => {
  const urls = await mediasService.handleUploadVideoHLS(req)
  return res.status(200).json({
    message: MEDIA_MESSAGES.UPLOAD_SUCCESSFUL,
    result: urls
  })
}

export const serveM3u8Controller = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const masterPath = path.resolve(UPLOAD_VIDEO_DIR, id, 'master.m3u8')
  return res.sendFile(path.resolve(masterPath), (err) => {
    if (err) {
      res.status((err as any).status).json({
        message: MEDIA_MESSAGES.NOT_FOUND
      })
    }
  })
}

export const serveSegmentController = (req: Request, res: Response, next: NextFunction) => {
  const { id, v, segment } = req.params
  // segment: 0.ts, 1.ts, 2.ts, ...
  return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, id, v, segment), (err) => {
    if (err) {
      res.status((err as any).status).json({
        message: MEDIA_MESSAGES.NOT_FOUND
      })
    }
  })
}
