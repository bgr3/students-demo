import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings';
import { blogsService } from '../domain/blog-service'; 
import { authorizationMiddleware } from '../middlewares/authorization-middleware';
import { blogInputValidationMiddleware, blogPostInputValidationMiddleware, inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { postsService } from '../domain/post-service';
import { blogCheckQuery } from '../features/blog-features';
import { postCheckQuery } from '../features/post-features';

export const blogsRouter = Router({});

blogsRouter.post('/',
  authorizationMiddleware,
  blogInputValidationMiddleware(),
  inputValidationMiddleware,  
  async (req: Request, res: Response) => {
    
    let result = await blogsService.createBlog(req.body)
    
    if (result) {
      const newBlog = await blogsService.findBlogByID(result)
      res.status(HTTP_STATUSES.CREATED_201).send(newBlog);
    } else {
      res.status(HTTP_STATUSES.BAD_REQUEST_400)
    }
})

blogsRouter.post('/:id/posts',
authorizationMiddleware,
blogPostInputValidationMiddleware(),
inputValidationMiddleware,
async (req: Request, res: Response) => {
  req.body.blogId = req.params.id.toString()
  
  let result = await postsService.createPost(req.body)
  
  if (!result) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return
  } 
  
  const newPost = await postsService.findPostById(result)
    
  res.status(HTTP_STATUSES.CREATED_201).send(newPost);
})

blogsRouter.get('/', async (req: Request, res: Response) => {
  const queryFilter = blogCheckQuery(req.query)
  
  res.status(HTTP_STATUSES.OK_200).send(await blogsService.findBlogs(queryFilter));
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
  
  const foundBlog = await blogsService.findBlogByID(req.params.id)

  if (foundBlog) {      
    res.status(HTTP_STATUSES.OK_200).send(foundBlog);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})

blogsRouter.get('/:id/posts', async (req: Request, res: Response) => {
  const foundBlog = await blogsService.findBlogByID(req.params.id)
  const queryFilter = postCheckQuery(req.query)
  
  const posts = await postsService.findPosts(req.params.id, queryFilter)

  if (!foundBlog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  } else {
    res.status(HTTP_STATUSES.OK_200).send(posts);
  } 
})

blogsRouter.put('/:id',
  authorizationMiddleware,
  blogInputValidationMiddleware(),
  inputValidationMiddleware, 
  async (req: Request, res: Response) => {
  
    const foundBlog = await blogsService.findBlogByID(req.params.id)
    
    if (foundBlog) {
      const updatedBlog = await blogsService.updateBlog(req.params.id, req.body) 
      
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
  
    const foundBlog = await blogsService.deleteBlog(req.params.id)
  
    if (foundBlog) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})