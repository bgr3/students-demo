import {Request, Response, Router} from 'express'
import {checkPosts} from '../check/check-posts'
import { HTTP_STATUSES } from '../settings';
import { postsRepository } from '../repositories/posts-repository';
import { inputValidationMiddleware, postInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { authorizationMiddleware } from '../middlewares/authorization-middleware';
import { postBlogIdValidation, postContentValidation, postTitleValidation, shortDescriptionValidation } from '../check/post-validation';

export const postsRouter = Router({});

postsRouter.post('/',
  authorizationMiddleware,
  postTitleValidation,
  postContentValidation,
  postBlogIdValidation,
  shortDescriptionValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
  let checkRequest = postsRepository.createPost(req.body)
  if (checkRequest) {
    const newPost = postsRepository.findPostByID(checkRequest)
    res.status(HTTP_STATUSES.CREATED_201).send(newPost);
  } else {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(checkPosts(req.body).errors);
  }
})

postsRouter.get('/', (req: Request, res: Response) => {
  res.status(HTTP_STATUSES.OK_200).send(postsRepository.findPosts());
})

postsRouter.get('/:id', (req: Request, res: Response) => {
  const foundPost = postsRepository.findPostByID(req.params.id)
  if (foundPost) {      
    res.status(HTTP_STATUSES.OK_200).send(foundPost);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})

postsRouter.put('/:id',
  authorizationMiddleware,
  postTitleValidation,
  postContentValidation,
  postBlogIdValidation,
  shortDescriptionValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
  const foundPost = postsRepository.findPostByID(req.params.id)
    if (foundPost) {
      const updatedPost = postsRepository.updatePost(req.params.id, req.body) 
      if (updatedPost) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(checkPosts(req.body).errors);
      }
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})  
  
postsRouter.delete('/:id',
  authorizationMiddleware,
  (req: Request, res: Response) => {
  const foundPost = postsRepository.deletePost(req.params.id)
  if (foundPost) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  } else {
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})