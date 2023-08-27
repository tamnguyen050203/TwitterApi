import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

/**
 * @swagger
 *  components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: tamnguyen@gmail.com
 *         password:
 *           type: string
 *           example: 123456#As
 *     SuccessAuthentication:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlMWRkMDlmYjQ5MWRkNDMzNmIxZTAyIiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE2OTMwMjY5NTUsImV4cCI6MTY5MzA0NDk1NX0.Jo4QrTg9QrBEgEXuzvy9N2sL9hoebdV51iuy8rTB1Pk
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlMWRkMDlmYjQ5MWRkNDMzNmIxZTAyIiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE2OTMwMjY2OTEsImV4cCI6MTY5MzA1OTE5MX0.KGMcfr06V_WsHPT1lqJEBuDNl7TbegsRKt5DZ1xjGCg
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: MongoDB ObjectId
 *           example: 64e1dd09fb491dd4336b1e02
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         date_of_birth:
 *           type: string
 *           format: ISO8601
 *           example: "2003-05-02T06:30:33.781Z"
 *         created_at:
 *           type: string
 *           format: ISO8601
 *           example: "2003-05-02T06:30:33.781Z"
 *         updated_at:
 *           type: string
 *           format: ISO8601
 *           example: "2003-05-02T06:30:33.781Z"
 *         verify:
 *           $ref: "#/components/schemas/UserVerifyStatus"
 *         twitter_circle:
 *           type: array
 *           items:
 *             type: string
 *             format: MongoDB ObjectId
 *           example: ["64e1dd09fb491dd4336b1e12", "64e1dd09asd91dd4336b1e12"]
 *         bio:
 *           type: string
 *         location:
 *           type: string
 *         website:
 *           type: string
 *         username:
 *           type: string
 *         avatar:
 *           type: string
 *           example: "https://i.imgur.com/1.jpg"
 *         cover_photo:
 *           type: string
 *           example: "https://i.imgur.com/1.jpg"
 *       example:
 *         _id: "64e1dd09fb491dd4336b1e02"
 *         name: "tam nguyen"
 *         email: "tamnguyen050203+6@gmail.com"
 *         date_of_birth: "2003-05-02T06:30:33.781Z"
 *         created_at: "2023-08-20T09:29:45.388Z"
 *         updated_at: "2023-08-20T09:30:43.788Z"
 *         verify: 1
 *         twitter_circle: []
 *         bio: ""
 *         location: ""
 *         website: ""
 *         username: "user_64e1dd09fb491dd4336b1e02"
 *         avatar: ""
 *         cover_photo: ""
 *     UserVerifyStatus:
 *       type: number
 *       enum: [Unverified, Verified, Banned]
 *       example: 1
 */

export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface VerifyForgotPasswordTokenReqBody {
  forgot_password_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface RefreshTokenReqBody {
  refresh_token: string
  verify: UserVerifyStatus
}

export interface GetProfileReqParams extends ParamsDictionary {
  username: string
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface UnfollowReqParams extends ParamsDictionary {
  user_id: string
}

export interface ChangePasswordReqBody extends ParamsDictionary {
  old_password: string
  new_password: string
  confirm_password: string
}
