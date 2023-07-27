import e, { Router } from 'express'
import { validate } from '~/utils/validation'
import {
  loginController,
  registerController,
  logoutController,
  refreshTokenController
} from '~/controllers/users.controllers'
import { refreshTokenValidator, loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { access } from 'fs'

const userRouter = Router()

userRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
userRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
userRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))
userRouter.post('/logout', refreshTokenValidator, wrapRequestHandler(logoutController))
export default userRouter
