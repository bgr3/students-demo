import {Router} from 'express'

export const videos =  [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}];

export const videosRouter = Router({});

videosRouter.put('/hometask_01/api/:id', (req: Request, res: Response) => {
    let product = products.find(i => i.id === +req.params.id);
    if (product) {
      product.title = req.body.title;
      res.status(201).send(product);
    } else {
      res.send(404);
    }
})
  
videosRouter.get('/', (req: Request, res: Response) => {
    if (req.query.id) {
      let query = req.query.id;
      res.send(products.find(i => i.id === +query));
    } else {
      res.send(products);
    }
})
  
videosRouter.post('/', (req: Request, res: Response) => {
    const newProduct = {id: products[products.length - 1].id + 1, title: req.body.title,};
    products.push(newProduct);
    res.status(201).send(newProduct);
})
  
videosRouter.get('/:productsTitle', (req: Request, res: Response) => {
    let product = products.find(p => p.title === req.params.productsTitle);
    if (product){
      res.send(product); 
    } else {
      res.sendStatus(404);
    }
})
  
videosRouter.delete('/:id', (req: Request, res: Response) => {
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