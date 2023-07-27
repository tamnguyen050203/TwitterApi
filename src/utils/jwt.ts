import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/User.requests'

config()

export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | object | Buffer
  privateKey?: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (_err, _token) => {
      if (_err) {
        reject(_err)
      }
      resolve(_token as string)
    })
  })
}

export const verifyToken = ({
  token,
  secretOnPublicKey = process.env.JWT_SECRET as string
}: {
  token: string
  secretOnPublicKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOnPublicKey, (_err, _decoded) => {
      if (_err) {
        throw reject(_err)
      }
      resolve(_decoded as TokenPayload)
    })
  })
}
