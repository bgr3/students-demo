import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { videosRouter } from './routes/videos-router'
import { addressesRouter } from './routes/testing-router'

export const app = express()

const parserMidleware = bodyParser({})
app.use(parserMidleware)

app.get('/', (req: Request, res: Response) => {
  let hello = `Time: ${Date.now()}`;
  res.send(hello);
})

app.use('hometask/api/testing', videosRouter)
app.use('/addresses', addressesRouter)

