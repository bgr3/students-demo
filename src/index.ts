import express, {Request, Response} from 'express'
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  let hello = 'Hello World!!!';
  res.send(hello);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})