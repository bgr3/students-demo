import {Router} from 'express'
import { authenticationMiddleware } from '../middlewares/authorization-middleware';
import { blogInputValidationMiddleware, blogPostInputValidationMiddleware, inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { blogsController } from '../compositions-roots/blogs-composition-root';

export const blogsRouter = Router({});

blogsRouter.post('/',
  authenticationMiddleware,
  blogInputValidationMiddleware(),
  inputValidationMiddleware,  
  blogsController.createBlog.bind(blogsController)
)

blogsRouter.post('/:id/posts',
  authenticationMiddleware,
  blogPostInputValidationMiddleware(),
  inputValidationMiddleware,
  blogsController.createPostforBlog.bind(blogsController)
)

blogsRouter.get('/', blogsController.getBlogs.bind(blogsController))

blogsRouter.get('/:id', blogsController.getBlog.bind(blogsController))

blogsRouter.get('/:id/posts', blogsController.getPostsforBlog.bind(blogsController))

blogsRouter.put('/:id',
  authenticationMiddleware,
  blogInputValidationMiddleware(),
  inputValidationMiddleware, 
  blogsController.updateBlog.bind(blogsController)
)  
  
blogsRouter.delete('/:id',
  authenticationMiddleware,
  inputValidationMiddleware, 
  blogsController.deleteBlog.bind(blogsController)
)