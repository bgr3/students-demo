import {Request, Response, NextFunction} from "express";
import { postsService } from "../domain/post-service"
import { HTTP_STATUSES } from "../settings"

export const postValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let post = await postsService.findPostById(req.params.postId)

    if (!post) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
}