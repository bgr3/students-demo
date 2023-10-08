import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings';
import { postFilter, postsService } from '../domain/post-service';
import { inputValidationMiddleware, postInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { authorizationMiddleware } from '../middlewares/authorization-middleware';

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
  if (req.query.pageNumber) {
    postFilter.pageNumber = Number (req.query.pageNumber)
  } else {
    postFilter.pageNumber = 1
  }

  if (req.query.pageSize) {
    postFilter.pageSize = Number (req.query.pageSize)
  } else {
    postFilter.pageSize = 10
  }

  if (typeof req.query.sortBy == 'string') {
    postFilter.sortBy = req.query.sortBy
  } else {
    postFilter.sortBy = 'createdAt'
  }

  if (typeof req.query.sortDirection === 'string') {
    postFilter.sortDirection = req.query.sortDirection
  } else {
    postFilter.sortDirection = 'desc'
  }
  
  res.status(HTTP_STATUSES.OK_200).send(await postsService.findPosts(null, postFilter));
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