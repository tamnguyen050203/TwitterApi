import { getNameFromFullName, handleUploadSingleImage } from '~/utils/file'
import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import fs from 'fs'

class MediasService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const newName = getNameFromFullName(file.newFilename)
    const newPath = UPLOAD_DIR + '/' + newName + '.jpg'
    await sharp(file.filepath).jpeg({ quality: 80 }).toFile(newPath)
    fs.unlinkSync(file.filepath)
    return `http://localhost:3070/uploads/${newName}.jpg`
  }
}

const mediasService = new MediasService()

export default mediasService
