import { S3 } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import fs from 'fs'
import { Upload } from '@aws-sdk/lib-storage'
import path from 'path'
import HTTP_STATUS from '~/constants/httpStatus'
import { Response } from 'express'
config()

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string
  }
})

export const uploadFileToS3 = ({
  filename,
  filepath,
  contentType
}: {
  filename: string
  filepath: string
  contentType: string
}) => {
  const parallelUploads3 = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: filename,
      Body: fs.readFileSync(filepath),
      ContentType: contentType
    },

    tags: [
      /*...*/
    ], // optional tags
    queueSize: 4, // optional concurrency configuration
    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
    leavePartsOnError: false // optional manually handle dropped parts
  })
  return parallelUploads3.done()
}

export const sendFileToS3 = async (res: Response, filepath: string) => {
  try {
    const data = await s3.getObject({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: filepath
    })
    ;(data.Body as any).pipe(res)
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: 'Not found'
    })
  }
}

// parallelUploads3.on('httpUploadProgress', (progress) => {
//   console.log(progress)
// })

// parallelUploads3.done().then((res) => {
//   console.log(res)
// })
