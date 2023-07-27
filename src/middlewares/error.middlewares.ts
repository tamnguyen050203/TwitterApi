import { ErrorRequestHandler } from 'express'
import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { omit } from 'lodash'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ErrorWithStatus) {
    res.status(error.status).json(omit(error, 'status'))
  }
  Object.getOwnPropertyNames(error).forEach((key) => {
    Object.defineProperty(error, key, { enumerable: true })
  })
  res.status(HTTP_STATUS.INTERNAL_SERVER).json({
    message: error.message,
    errorInfo: omit(error, 'stack')
  })
}
