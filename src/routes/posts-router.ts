import {Request, Response, Router} from 'express'
import {checkPosts} from '../validation/--NO check-posts'
import { HTTP_STATUSES } from '../settings';
import { postsRepository } from '../repositories/posts-db-repository';
import { inputValidationMiddleware, postInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { authorizationMiddleware } from '../middlewares/authorization-middleware';

export const postsRouter = Router({});

postsRouter.post('/',
  authorizationMiddleware,
  postInputValidationMiddleware(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
  
    let result = await postsRepository.createPost(req.body)
    
    if (!result) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
      return
    } 

    const newPost = await postsRepository.findPostByID(result)
      
    res.status(HTTP_STATUSES.CREATED_201).send(newPost);
})


postsRouter.get('/', async (req: Request, res: Response) => {
  
  res.status(HTTP_STATUSES.OK_200).send(await postsRepository.findPosts());
})


postsRouter.get('/:id', async (req: Request, res: Response) => {
  
  const foundPost = await postsRepository.findPostByID(req.params.id)
  
  if (foundPost) {      
    res.status(HTTP_STATUSES.OK_200).send(foundPost);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})


postsRouter.put('/:id',
  authorizationMiddleware,
  postInputValidationMiddleware,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
  
    const updatedPost = await postsRepository.updatePost(req.params.id, req.body) 
    
    if (!updatedPost) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})  
  

postsRouter.delete('/:id',
  authorizationMiddleware,
  async (req: Request, res: Response) => {
  
    const foundPost = await postsRepository.deletePost(req.params.id)
  
    if (foundPost) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})