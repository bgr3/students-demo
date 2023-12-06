import { Router } from "express";
import { authenticationJWTMiddleware, authorizationCommentMiddleware } from "../middlewares/authorization-middleware";
import { commentInputValidationMiddleware, LikeStatusValidationMiddleware, inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { commentExistMiddleware } from "../middlewares/comment-validation-middleware";
import { container } from "../ioc-containers/ioc-container";
import { CommentsController } from "../controllers/comments-controller";

const commentsController = container.get<CommentsController>(CommentsController)

export const commentsRouter = Router({});

commentsRouter.put('/:id/like-status',                                              //like status update
  authenticationJWTMiddleware,
  commentExistMiddleware,
  LikeStatusValidationMiddleware(),
  inputValidationMiddleware,
  commentsController.likeStatus.bind(commentsController))

commentsRouter.get('/:id', commentsController.getComment.bind(commentsController)) //get comment by id

commentsRouter.put('/:id',                                                         //update comment by  id
  authenticationJWTMiddleware,
  authorizationCommentMiddleware,
  commentInputValidationMiddleware(),
  inputValidationMiddleware,
  commentsController.updateComment.bind(commentsController)
)  
  

commentsRouter.delete('/:id',                                                     //delete commet by id
  authenticationJWTMiddleware,
  authorizationCommentMiddleware,
  commentsController.deleteComment.bind(commentsController)
)

