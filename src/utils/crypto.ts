import { createHash } from 'crypto'
import { config } from 'dotenv'

config()

export function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

export function hashPassword(password: string) {
  const salt = process.env.PASSWORD_SALT as string
  return sha256(password + salt)
}
