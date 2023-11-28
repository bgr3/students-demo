import {Request, Response, NextFunction} from "express";
import { HTTP_STATUSES } from "../settings"
import { PostsQueryRepository } from "../repositories/posts-repository/posts-query-db-repository";
import { CommentsQueryRepository } from "../repositories/comments-repository/comments-query-db-repository";

const postsQueryRepository = new PostsQueryRepository()
const commentsQueryRepository = new CommentsQueryRepository()

export const postValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let post = await postsQueryRepository.findPostByID(req.params.postId)

    if (!post) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
      return
    }

    next()
}

export const commentExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const comment = await commentsQueryRepository.findCommentByID(req.params.id)
  
  if (comment) {
          next()
          return
      } else {
          res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
          return
      }
}