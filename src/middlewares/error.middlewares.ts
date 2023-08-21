import { ErrorRequestHandler } from 'express'
import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { omit } from 'lodash'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  try {
    if (error instanceof ErrorWithStatus) {
      res.status(error.status).json(omit(error, 'status'))
    }
    const finalError: any = {}
    Object.getOwnPropertyNames(error).forEach((key) => {
      if (
        !Object.getOwnPropertyDescriptor(error, key)?.configurable ||
        !Object.getOwnPropertyDescriptor(error, key)?.writable
      ) {
        return
      }
      finalError[key] = error[key]
    })
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      message: finalError.message,
      errorInfo: omit(finalError, 'stack')
    })
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      message: 'Internal server error',
      errorInfo: omit(error as any, 'stack')
    })
  }
}
