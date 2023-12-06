import { Request, Response } from "express";
import { CommentsService } from "../domain/comment-service";
import { CommentsQueryRepository } from "../repositories/comments-repository/comments-query-db-repository";
import { HTTP_STATUSES } from "../settings";
import { AuthorizationValidation } from "../validation/authorization-validation";
import { injectable } from "inversify";
import "reflect-metadata";
import { UsersService } from "../domain/user-service";


@injectable()
export class CommentsController {
    constructor(
      protected authorizationValidation: AuthorizationValidation,
      protected commentsService: CommentsService,
      protected commentsQueryRepository: CommentsQueryRepository){}

    async likeStatus(req: Request, res: Response) {
      const token = req.headers.authorization!  
      const id = req.params.id
      const body = req.body
      const result = await this.commentsService.likeStatus(id, token, body)     
      
      if (!result) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
      }

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

    async getComment(req: Request, res: Response) {
      const accessToken = req.headers.authorization
      let userId = ''
      if(accessToken){
        const user = await this.authorizationValidation.getUserByJWTAccessToken(accessToken)  
        if(user) {
          userId = user!._id.toString()
        }
      }
      
      const foundComment = await this.commentsQueryRepository.findCommentByID(req.params.id, userId)
      
      if (foundComment) {      
        res.status(HTTP_STATUSES.OK_200).send(foundComment);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }

    async updateComment(req: Request, res: Response) {
  
      const updatedComment = await this.commentsService.updateComment(req.params.id, req.body) 
      
      if (!updatedComment) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
      }
    
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }

    async deleteComment(req: Request, res: Response) {
  
      const foundComment = await this.commentsService.deleteComment(req.params.id)
    
      if (foundComment) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  }