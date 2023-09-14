import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3000

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}];
const adress = [{value: 'srlmash'}, {value: 'volotova'}];

const parserMidleware = bodyParser({})
app.use(parserMidleware)

app.get('/', (req: Request, res: Response) => {
  let hello = 'Hello 123';
  res.send(hello);
})

app.put('/products/:id', (req: Request, res: Response) => {
  let product = products.find(i => i.id === +req.params.id);
  if (product) {
    product.title = req.body.title;
    res.status(201).send(product);
  } else {
    res.send(404);
  }
})

app.get('/products', (req: Request, res: Response) => {
  if (req.query.id) {
    res.send(products.find(i => i.id === +req.query.id));
  } else {
    res.send(products);
  }
})

app.post('/products', (req: Request, res: Response) => {
  const newProduct = {id: products[products.length - 1].id + 1, title: req.body.title,};
  products.push(newProduct);
  res.status(201).send(newProduct);
})

app.get('/products/:productsTitle', (req: Request, res: Response) => {
  let product = products.find(p => p.title === req.params.productsTitle);
  if (product){
    res.send(product); 
  } else {
    res.sendStatus(404);
  }
})

app.delete('/products/:id', (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.send(204);
      return;
    }
    res.send(404);
  }
  let product = products.find(p => p.title === req.params.productsTitle);
  if (product){
    res.send(product); 
  } else {
    res.sendStatus(404);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})