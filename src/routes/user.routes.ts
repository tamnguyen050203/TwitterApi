import e, { Router } from 'express'
import { validate } from '~/utils/validation'
import {
  loginController,
  registerController,
  logoutController,
  refreshTokenController,
  verifyEmailController,
  resendVerifyEmailController,
  forgotPasswordController,
  verifyForgotPasswordTokenController,
  resetPasswordController,
  getMeController,
  updateMeController,
  getProfileController,
  followController,
  unfollowController,
  changePasswordController
} from '~/controllers/users.controllers'
import {
  refreshTokenValidator,
  loginValidator,
  registerValidator,
  accessTokenValidator,
  verifyEmailTokenValidator,
  forgotPasswordValidator,
  verifyForgotPasswordTokenValidator,
  resetPasswordValidator,
  verifiedUserValidator,
  updateMeValidator,
  followValidator,
  unfollowValidator,
  changePasswordValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
import { access } from 'fs'

const userRouter = Router()

/**
 * Description. Login a user
 * Path: /api/users/login
 * Body: { email: string, password: string }
 */
userRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description. Register a new user
 * Path: /api/users/register
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
userRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description. Logout a user
 * Path: /api/users/refresh-token
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
userRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

/**
 * Description. Logout a user
 * Path: /api/users/logout
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description. Verify email user client click link in email
 * Path: /api/users/verify-email
 * Body: { refreshToken: string }
 */
userRouter.post('/verify-email', verifyEmailTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description. Verify email when user client click on the link in email
 * Path: /api/users/resend-verify-email
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 */
userRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * Description. Submit email to reset password, send email to user
 * Path: /api/users/forgot-password
 * Body: {email: string}
 */
userRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description. Verify link in email to reset password
 * Path: /api/users/verify-forgot-password
 * Body: {forgot_password_token: string}
 */
userRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordTokenController)
)

/**
 * Description: Reset password
 * Path: /api/users/reset-password
 * Body: {forgot_password_token: string, password: string, confirm_password: string}
 */
userRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * Description: Get info of user
 * Path: /api/users/me
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 */
userRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/**
 * Description: Update my profile
 * Path: /api/users/me
 * Header: { Authorization: Bearer <access_token> }
 * Body: UserSchema
 */
userRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'avatar',
    'username',
    'cover_photo'
  ]),
  wrapRequestHandler(updateMeController)
)

/**
 * Description: Get user profile
 * Path: /api/users/:username
 */
userRouter.get('/:username', wrapRequestHandler(getProfileController))

/**
 * Description: Follow someone
 * Path: /api/users/follow
 * Header: { Authorization: Bearer <access_token> }
 * Body: { followed_user_id: string }
 */
userRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)

/**
 * Description: Un Follow someone
 * Path: /api/users/follow/user_id
 * Header: { Authorization: Bearer <access_token> }
 * Body: { followed_user_id: string }
 */
userRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)

/**
 * Description: Change password
 * Path: /api/users/change-password
 * Header: { Authorization: Bearer <access_token> }
 * Body: { old_password: string, new_password: string, confirm_new_password: string }
 */
userRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

export default userRouter
