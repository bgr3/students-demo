import {Request, Response, Router} from 'express'
import {checkBlogs} from '../validation/--NO check-blogs'
import { HTTP_STATUSES } from '../settings';
import { blogsRepository } from '../repositories/blogs-db-repository';
import { authorizationMiddleware } from '../middlewares/authorization-middleware';
import { blogInputValidationMiddleware, inputValidationMiddleware } from '../middlewares/input-validation-middleware';

export const blogsRouter = Router({});


blogsRouter.post('/',
  authorizationMiddleware,
  blogInputValidationMiddleware(),
  inputValidationMiddleware,  
  async (req: Request, res: Response) => {
    
    let result = await blogsRepository.createBlog(req.body)
    
    if (result) {
      const newBlog = await blogsRepository.findBlogByID(result)
      res.status(HTTP_STATUSES.CREATED_201).send(newBlog);
    } else {
      res.status(HTTP_STATUSES.BAD_REQUEST_400)
    }
})

blogsRouter.get('/', async (req: Request, res: Response) => {
  
  res.status(HTTP_STATUSES.OK_200).send(await blogsRepository.findBlogs());
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
  
  const foundBlog = await blogsRepository.findBlogByID(req.params.id)
  
  if (foundBlog) {      
    res.status(HTTP_STATUSES.OK_200).send(foundBlog);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})

blogsRouter.put('/:id',
  authorizationMiddleware,
  blogInputValidationMiddleware(),
  inputValidationMiddleware, 
  async (req: Request, res: Response) => {
  
    const foundBlog = await blogsRepository.findBlogByID(req.params.id)
    
    if (foundBlog) {
      const updatedBlog = await blogsRepository.updateBlog(req.params.id, req.body) 
      
      if (updatedBlog) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
        res.status(HTTP_STATUSES.BAD_REQUEST_400);
      }
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})  
  
blogsRouter.delete('/:id',
  authorizationMiddleware,
  inputValidationMiddleware, 
  async (req: Request, res: Response) => {
  
    const foundBlog = await blogsRepository.deleteBlog(req.params.id)
  
    if (foundBlog) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})