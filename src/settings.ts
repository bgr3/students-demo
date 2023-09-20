import express, {Request, Response} from 'express'
import { videosRouter } from './routes/videos-router'
import { testingRouter } from './routes/testing-router'

export const app = express()
export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
}

export const RouterPaths = {
  testing: '/testing',
  videos: '/videos',
  api: '/hometask_01/api',
}

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  let hello = `Hello!`;
  res.send(hello);
})

app.use(RouterPaths.api + RouterPaths.testing, testingRouter)
app.use(RouterPaths.api + RouterPaths.videos, videosRouter)



