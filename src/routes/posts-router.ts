import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings';
import { postsService } from '../domain/post-service';
import { inputValidationMiddleware, postInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { authorizationMiddleware } from '../middlewares/authorization-middleware';
import { postCheckQuery } from '../features/post-features';

export const postsRouter = Router({});

postsRouter.post('/',
  authorizationMiddleware,
  postInputValidationMiddleware(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
  
    let result = await postsService.createPost(req.body)
    
    if (!result) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
      return
    } 

    const newPost = await postsService.findPostById(result)
      
    res.status(HTTP_STATUSES.CREATED_201).send(newPost);
})


postsRouter.get('/', async (req: Request, res: Response) => {
  const queryFilter = postCheckQuery(req.query)
  
  res.status(HTTP_STATUSES.OK_200).send(await postsService.findPosts(null, queryFilter));
})


postsRouter.get('/:id', async (req: Request, res: Response) => {
  
  const foundPost = await postsService.findPostById(req.params.id)
  
  if (foundPost) {      
    res.status(HTTP_STATUSES.OK_200).send(foundPost);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})


postsRouter.put('/:id',
  authorizationMiddleware,
  postInputValidationMiddleware(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
  
    const updatedPost = await postsService.updatePost(req.params.id, req.body) 
    
    if (!updatedPost) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})  
  

postsRouter.delete('/:id',
  authorizationMiddleware,
  async (req: Request, res: Response) => {
  
    const foundPost = await postsService.deletePost(req.params.id)
  
    if (foundPost) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})