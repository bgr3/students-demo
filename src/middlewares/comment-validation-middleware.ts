import {Request, Response, NextFunction} from "express";
import { HTTP_STATUSES } from "../settings"
import { postsQueryRepository } from "../repositories/posts-repository/posts-query-db-repository";

export const postValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let post = await postsQueryRepository.findPostByID(req.params.postId)

    if (!post) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
      return
    }

    next()
}