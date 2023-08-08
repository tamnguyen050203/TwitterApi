import express from 'express'
import userRouter from '~/routes/user.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediaRouter from './routes/media.routes'
import { initFolder } from './utils/file'
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from './constants/dir'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'

config()

databaseService.connect()

const app = express()
const port = process.env.PORT || 3066

// Crate folder
initFolder(UPLOAD_TEMP_DIR)

app.use(express.json())
app.use('/users', userRouter)
app.use('/medias', mediaRouter)
app.use('/static', staticRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
