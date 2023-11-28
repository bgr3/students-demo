import { Router } from "express";
import { authenticationJWTMiddleware, authorizationCommentMiddleware } from "../middlewares/authorization-middleware";
import { commentInputValidationMiddleware, inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { commentsController } from "../compositions-roots/comments-composition-root";

export const commentsRouter = Router({});

commentsRouter.put('/:id/like-status',
  authenticationJWTMiddleware,
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

