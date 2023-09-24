import {Request, Response, Router} from 'express'
import {checkBlogs} from '../check/check-blogs'
import { HTTP_STATUSES } from '../settings';
import { blogsRepository } from '../repositories/blogs-repository';
import { authorizationMiddleware } from '../middlewares/authorization-middleware';
import { blogValidationMiddleware, inputValidationMiddleware } from '../middlewares/input-validation-middleware';

export const blogsRouter = Router({});


blogsRouter.post('/',
  authorizationMiddleware,
  inputValidationMiddleware,  
  (req: Request, res: Response) => {
  let checkRequest = blogsRepository.createBlog(req.body)
  if (checkRequest) {
    const newBlog = blogsRepository.findBlogByID(checkRequest)
    res.status(HTTP_STATUSES.CREATED_201).send(newBlog);
  } else {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(checkBlogs(req.body).errors);
  }
})

blogsRouter.get('/', (req: Request, res: Response) => {
  res.status(HTTP_STATUSES.OK_200).send(blogsRepository.findBlogs());
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
  const foundBlog = blogsRepository.findBlogByID(req.params.id)
  if (foundBlog) {      
    res.status(HTTP_STATUSES.OK_200).send(foundBlog);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})

blogsRouter.put('/:id',
  authorizationMiddleware,
  inputValidationMiddleware, 
  (req: Request, res: Response) => {
  const foundBlog = blogsRepository.findBlogByID(req.params.id)
    if (foundBlog) {
      const updatedBlog = blogsRepository.updateBlog(req.params.id, req.body) 
      if (updatedBlog) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(checkBlogs(req.body).errors);
      }
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})  
  
blogsRouter.delete('/:id',
  authorizationMiddleware,
  inputValidationMiddleware, 
  (req: Request, res: Response) => {
  const foundBlog = blogsRepository.deleteBlog(req.params.id)
  if (foundBlog) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  } else {
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})