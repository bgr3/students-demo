import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { videosRouter } from './routes/videos-router'
import { testingRouter } from './routes/testing-router'

export const app = express()

const parserMidleware = bodyParser({})
app.use(parserMidleware)

app.get('/', (req: Request, res: Response) => {
  let hello = `Hello`;
  res.send(hello);
})

app.use('/hometask_01/api/testing', testingRouter)
app.use('/hometask_01/api/videos', videosRouter)

