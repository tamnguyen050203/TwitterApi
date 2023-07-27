import express from 'express'
import userRouter from '~/routes/user.routes'
import databaseService from '~/services/database.services'
import { Request, Response, NextFunction } from 'express'
import { defaultErrorHandler } from './middlewares/error.middlewares'

databaseService.connect()

const app = express()
const port = 3066

app.use(express.json())
app.use('/users', userRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
