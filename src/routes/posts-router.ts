import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings';
import { postsService } from '../domain/post-service';
import { commentInputValidationMiddleware, inputValidationMiddleware, postInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { authenticationJWTMiddleware, authenticationMiddleware } from '../middlewares/authorization-middleware';
import { postCheckQuery } from '../features/post-features';
import { commentsService } from '../domain/comment-service';
import { postValidationMiddleware } from '../middlewares/comment-validation-middleware';
import { commentsQueryRepository } from '../repositories/comments-repository/comments-query-db-repository';
import { postsQueryRepository } from '../repositories/posts-repository/posts-query-db-repository';

export const postsRouter = Router({});

postsRouter.post('/',                                    //create new post
  authenticationMiddleware,
  postInputValidationMiddleware(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
  
    let result = await postsService.createPost(req.body)
    
    if (!result) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
      return
    } 

    const newPost = await postsQueryRepository.findPostByID(result)
      
    res.status(HTTP_STATUSES.CREATED_201).send(newPost);
})

postsRouter.post('/:postId/comments',                     //create new comment
  authenticationJWTMiddleware,
  postValidationMiddleware,
  commentInputValidationMiddleware(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const token = req.headers.authorization!
    const result = await commentsService.createComment(req.body, token, req.params.postId)
      if (!result) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
      return
    } 

    const newPost = await commentsQueryRepository.findCommentByID(result)
      
    res.status(HTTP_STATUSES.CREATED_201).send(newPost);
})


postsRouter.get('/', async (req: Request, res: Response) => {  
  const queryFilter = postCheckQuery(req.query)
  
  res.status(HTTP_STATUSES.OK_200).send(await postsQueryRepository.findPosts(null, queryFilter));
})


postsRouter.get('/:id', async (req: Request, res: Response) => {
  
  const foundPost = await postsQueryRepository.findPostByID(req.params.id)
  
  if (foundPost) {      
    res.status(HTTP_STATUSES.OK_200).send(foundPost);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})

postsRouter.get('/:id/comments', async (req: Request, res: Response) => {      //returns comments for specified post
  const queryFilter = postCheckQuery(req.query)
  const post = await postsQueryRepository.findPostByID(req.params.id)

  const foundcomments = await commentsQueryRepository.findComments(req.params.id, queryFilter)
  
  if (post) {      
    res.status(HTTP_STATUSES.OK_200).send(foundcomments);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})

postsRouter.put('/:id',
  authenticationMiddleware,
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
  authenticationMiddleware,
  async (req: Request, res: Response) => {
  
    const foundPost = await postsService.deletePost(req.params.id)
  
    if (foundPost) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})