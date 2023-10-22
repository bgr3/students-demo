import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../settings";
import { checkAuthorization, checkJWTAuthorization } from "../validation/authorization-validation";
import { commentsService } from "../domain/comment-service";

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    if (await checkAuthorization(req.headers.authorization)){
        next()
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
}

export const authenticationJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = await checkJWTAuthorization(req.headers.authorization)
    if (user){
        req.user = user
        next()
        return
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
}

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const comment = await commentsService.findCommentById(req.params.id)
    
    if (comment) {
        if (comment.commentatorInfo.userId === req.user!.id) {
            next()
            return
        } else {
            res.sendStatus(HTTP_STATUSES.FORBIDDEN_403)
            return
        }
    }

    next()    
}