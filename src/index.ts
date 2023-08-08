import express from 'express'
import userRouter from '~/routes/user.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediaRouter from './routes/media.routes'
import { initFolder } from './utils/file'
import { UPLOAD_TEMP_DIR } from './constants/dir'

databaseService.connect()

const app = express()
const port = 3066

// Crate folder
initFolder(UPLOAD_TEMP_DIR)

app.use(express.json())
app.use('/users', userRouter)
app.use('/medias', mediaRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
