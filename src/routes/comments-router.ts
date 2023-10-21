import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../settings";
import { authorizationJWTMiddleware } from "../middlewares/authorization-middleware";
import { commentsService } from "../domain/comment-service";
import { commentInputValidationMiddleware, inputValidationMiddleware } from "../middlewares/input-validation-middleware";

export const commentsRouter = Router({});

commentsRouter.get('/:id', 
authorizationJWTMiddleware,
async (req: Request, res: Response) => {
  
  const foundComment = await commentsService.findCommentById(req.params.id)
  
  if (foundComment) {      
    res.status(HTTP_STATUSES.OK_200).send(foundComment);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})

commentsRouter.put('/:id',
authorizationJWTMiddleware,
commentInputValidationMiddleware(),
inputValidationMiddleware,
async (req: Request, res: Response) => {

  const updatedComment = await commentsService.updateComment(req.params.id, req.body) 
  
  if (!updatedComment) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})  
  

commentsRouter.delete('/:id',
authorizationJWTMiddleware,
async (req: Request, res: Response) => {

  const foundComment = await commentsService.deleteComment(req.params.id)

  if (foundComment) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})

