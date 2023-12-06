import { Router } from 'express'
import { commentInputValidationMiddleware, LikeStatusValidationMiddleware, inputValidationMiddleware, postInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { authenticationJWTMiddleware, authenticationMiddleware } from '../middlewares/authorization-middleware';
import { postExistMiddleware, postValidationMiddleware } from '../middlewares/comment-validation-middleware';
import { container } from '../ioc-containers/ioc-container';
import { PostsController } from '../controllers/posts-controller';

const postsController = container.get<PostsController>(PostsController)

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

postsRouter.put('/:id/like-status',
  authenticationJWTMiddleware,
  postExistMiddleware,
  LikeStatusValidationMiddleware(),
  inputValidationMiddleware,
  postsController.likeStatus.bind(postsController)
) 
  

postsRouter.delete('/:id',
  authenticationMiddleware,
  postsController.deletePost.bind(postsController)
)