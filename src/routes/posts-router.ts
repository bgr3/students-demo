import { Router } from 'express'
import { commentInputValidationMiddleware, inputValidationMiddleware, postInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { authenticationJWTMiddleware, authenticationMiddleware } from '../middlewares/authorization-middleware';
import { postValidationMiddleware } from '../middlewares/comment-validation-middleware';
import { postsController } from '../compositions-roots/posts-composition-root';


export const postsRouter = Router({});

postsRouter.post('/',                                    //create new post
  authenticationMiddleware,
  postInputValidationMiddleware(),
  inputValidationMiddleware,
  postsController.createPost.bind(postsController)
)

postsRouter.post('/:postId/comments',                     //create new comment
  authenticationJWTMiddleware,
  postValidationMiddleware,
  commentInputValidationMiddleware(),
  inputValidationMiddleware,
  postsController.createCommentForPost.bind(postsController)
)

postsRouter.get('/', postsController.getPosts.bind(postsController))

postsRouter.get('/:id', postsController.getPost.bind(postsController))

postsRouter.get('/:id/comments', postsController.getCommentsForPost.bind(postsController))                     //returns comments for specified post

postsRouter.put('/:id',
  authenticationMiddleware,
  postInputValidationMiddleware(),
  inputValidationMiddleware,
  postsController.updatePost.bind(postsController)
)  
  

postsRouter.delete('/:id',
  authenticationMiddleware,
  postsController.deletePost.bind(postsController)
)