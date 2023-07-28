import { hashPassword } from '~/utils/crypto'
import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
import { signToken } from '~/utils/jwt'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { RegisterReqBody } from '~/models/requests/User.requests'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'

config()

class UserService {
  // Sign access token
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  // Sign refresh token
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  // Sign access and refresh token
  private signAccessAndRefreshToken({ user_id, verify }: { user_id: string; verify: boolean }) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }

  // Sign email verify token
  private signEmailVerifyToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken
      },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      options: {
        expiresIn: process.env.EMAIL_TOKEN_VERIFY_EXPIRES_IN
      }
    })
  }

  // Sign forgot password token
  private signForgotPasswordToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      options: {
        expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN
      }
    })
  }

  // Login
  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id,
      verify: true
    })

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refresh_token
      })
    )

    return {
      access_token,
      refresh_token
    }
  }
  // Register
  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString())
    await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        email_verify_token,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )

    console.log('email verify token : ', email_verify_token)

    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id.toString()),
      this.signRefreshToken(user_id.toString())
    ])

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refresh_token
      })
    )

    return {
      access_token,
      refresh_token
    }
  }

  // Check email exist
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  // Logout
  async logout(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESSFUL
    }
  }

  // Refresh token
  async refreshToken(refresh_token_receive: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token_receive })
    const user = await databaseService.refreshTokens.findOne({ token: refresh_token_receive })
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id: user?.user_id.toString() || '',
      verify: true
    })

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user?.user_id),
        token: refresh_token
      })
    )

    return {
      access_token,
      refresh_token
    }
  }

  // Verify email
  async verifyEmail(user_id: string) {
    const [token] = await Promise.all([
      this.signAccessAndRefreshToken({ user_id, verify: true }),
      databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
        {
          $set: {
            email_verify_token: '',
            verify: UserVerifyStatus.Verified,
            updated_at: '$$NOW'
          }
        }
      ])
    ])

    const [access_token, refresh_token] = token

    return {
      access_token,
      refresh_token
    }
  }

  // Resend email verify token
  async resendVerifyEmail(user_id: string) {
    const email_verify_token = await this.signEmailVerifyToken(user_id)

    // Update email verify token
    await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          email_verify_token
        },
        $currentDate: {
          updated_at: true
        }
      }
    )

    console.log('email verify token : ', email_verify_token)

    return {
      message: USERS_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESSFUL
    }
  }

  // Forgot password
  async forgotPassword(user_id: string) {
    const forgot_password_token = await this.signForgotPasswordToken(user_id)
    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          forgot_password_token,
          updated_at: '$$NOW'
        }
      }
    ])

    console.log('forgot password token : ', forgot_password_token)
    return {
      message: USERS_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
    }
  }
}

const userService = new UserService()
export default userService
