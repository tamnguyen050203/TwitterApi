import e, { Router } from 'express'
import { validate } from '~/utils/validation'
import {
  loginController,
  registerController,
  logoutController,
  refreshTokenController,
  emailVerifyController
} from '~/controllers/users.controllers'
import {
  refreshTokenValidator,
  loginValidator,
  registerValidator,
  accessTokenValidator,
  emailVerifyTokenValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { access } from 'fs'

const userRouter = Router()

userRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
userRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
userRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description. Verify email user client click link in email
 * Path: /api/users/verify-email
 * Method: POST
 * Body: { refreshToken: string }
 */
userRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))

export default userRouter
