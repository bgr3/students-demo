import { Router } from "express";
import { authenticationJWTMiddleware, authorizationCommentMiddleware } from "../middlewares/authorization-middleware";
import { commentInputValidationMiddleware, commentLikeStatusValidationMiddleware, inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { commentsController } from "../compositions-roots/comments-composition-root";
import { commentExistMiddleware } from "../middlewares/comment-validation-middleware";

export const commentsRouter = Router({});

commentsRouter.put('/:id/like-status',
  authenticationJWTMiddleware,
  commentExistMiddleware,
  commentLikeStatusValidationMiddleware,
  inputValidationMiddleware,
  commentsController.likeStatus.bind(commentsController))

commentsRouter.get('/:id', commentsController.getComment.bind(commentsController))

commentsRouter.put('/:id',
  authenticationJWTMiddleware,
  authorizationCommentMiddleware,
  commentInputValidationMiddleware(),
  inputValidationMiddleware,
  commentsController.updateComment.bind(commentsController)
)  
  

commentsRouter.delete('/:id',
  authenticationJWTMiddleware,
  authorizationCommentMiddleware,
  commentsController.deleteComment.bind(commentsController)
)

