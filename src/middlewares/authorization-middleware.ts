import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../settings";
import { checkAuthorization, checkJWTAuthorization } from "../validation/authorization-validation";
import { commentsService } from "../domain/comment-service";
import { jwtService } from "../application/jwt-service";
import { usersService } from "../domain/user-service";

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    if (await checkAuthorization(req.headers.authorization)){
        next()
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
}

export const authenticationJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = await checkJWTAuthorization(req.headers.authorization)
    if (user) {
        for (let i = 0; i < user.JWTTokens.length; i ++){
            if (user.JWTTokens[i].acsessToken === req.headers.authorization?.split(' ')[1]) {
                req.user = user
                next()
                return
            }
        }
    }

    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
}

export const authenticationRefreshJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    const userId = await jwtService.validateRefreshToken(refreshToken)
    const user = await usersService.findUserDbByID(userId)

    if (user) {
        for (let i = 0; i < user.JWTTokens.length; i ++){
            if (user.JWTTokens[i].refreshToken === refreshToken) {
                req.user = user
                next()
                return
            }
        }

    }
    
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
}

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const comment = await commentsService.findCommentById(req.params.id)
    
    if (comment) {
        if (comment.commentatorInfo.userId === req.user!._id.toString()) {
            next()
            return
        } else {
            res.sendStatus(HTTP_STATUSES.FORBIDDEN_403)
            return
        }
    }

    next()    
}