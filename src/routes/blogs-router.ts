import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings';
import { blogFilter, blogsService } from '../domain/blog-service'; 
import { authorizationMiddleware } from '../middlewares/authorization-middleware';
import { blogInputValidationMiddleware, blogPostInputValidationMiddleware, inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { postsService } from '../domain/post-service';

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
  if (req.query.pageNumber) {
    blogFilter.pageNumber = Number (req.query.pageNumber)
  } else {
    blogFilter.pageNumber = 1
  }

  if (req.query.pageSize) {
    blogFilter.pageSize = Number (req.query.pageSize)
  } else {
    blogFilter.pageSize = 10
  }

  if (typeof req.query.sortBy == 'string') {
    blogFilter.sortBy = req.query.sortBy
  } else {
    blogFilter.sortBy = 'createdAt'
  }

  if (typeof req.query.sortDirection === 'string') {
    blogFilter.sortDirection = req.query.sortDirection
  } else {
    blogFilter.sortDirection = 'desc'
  }
  
  res.status(HTTP_STATUSES.OK_200).send(await blogsService.findBlogs(blogFilter));
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
  const posts = await postsService.findPosts(req.params.id)
  if (posts.items.length > 0) {
    res.status(HTTP_STATUSES.OK_200).send(posts);
    return
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
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