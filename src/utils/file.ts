import fs from 'fs'
import path from 'path'
import formidable, { File } from 'formidable'
import { Request } from 'express'
import { UPLOAD_TEMP_DIR } from '~/constants/dir'

export const initFolder = (folder: string) => {
  if (!fs.existsSync(path.resolve(folder))) {
    fs.mkdirSync(path.resolve(folder), {
      recursive: true // create folder nested
    })
  }
}

export const handleUploadSingleImage = async (req: Request) => {
  const form = formidable({
    uploadDir: path.resolve(UPLOAD_TEMP_DIR),
    maxFiles: 1,
    keepExtensions: true,
    maxFieldsSize: 300 * 1024, // 300KB
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (!files.image) {
        return reject(new Error('File is not found'))
      }
      resolve((files.image as File[])[0])
    })
  })
}

export const getNameFromFullName = (fullname: string) => {
  const name_arr = fullname.split('.')
  name_arr.pop()
  return name_arr.join('')
}
