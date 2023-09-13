import express, {Request, Response} from 'express'
const app = express()
const port = process.env.PORT || 3000

const products = [{title: 'tomato'}, {title: 'orange'}];
const adress = [{value: 'srlmash'}, {value: 'volotova'}];

app.get('/', (req: Request, res: Response) => {
  let hello = 'Hello 123';
  res.send(hello);
})

app.get('/products', (req: Request, res: Response) => {
  res.send(products)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})