import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
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

const parserMidleware = bodyParser({})
app.use(parserMidleware)

app.get('/', (req: Request, res: Response) => {
  let hello = `Hello!`;
  res.send(hello);
})

app.use('/hometask_01/api/testing', testingRouter)
app.use('/hometask_01/api/videos', videosRouter)

