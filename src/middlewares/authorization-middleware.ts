import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../settings";
import { checkAuthorization, checkJWTAuthorization, getUserByJWTAccessToken } from "../validation/authorization-validation";
import { jwtService } from "../application/jwt-service";
import { authRepository } from "../repositories/auth-repository/auth-db-repository";
import { authService } from "../domain/auth-service";
import { commentsQueryRepository } from "../repositories/comments-repository/comments-query-db-repository";

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    if (await checkAuthorization(req.headers.authorization)){
        next()
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
}

export const authenticationJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = await checkJWTAuthorization(req.headers.authorization)
    
    if (token) {
        const validation = await authRepository.findAuthSessionByAccessToken(token)
        
        if (validation) {
            next()          
            return
        }
    } 

    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
}

export const authenticationRefreshJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    
    if (refreshToken) {
        const deviceId = await jwtService.validateRefreshToken(refreshToken)
        const validation = await authRepository.findAuthSessionByDeviceId(deviceId)

        if (validation?.tokens.refreshToken === refreshToken) {
            next()
            return
        }
    }

    
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
}

export const authorizationCommentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const comment = await commentsQueryRepository.findCommentByID(req.params.id)
    const user = await getUserByJWTAccessToken(req.headers.authorization)
    
    if (comment && user) {
        if (comment.commentatorInfo.userId === user._id.toString()) {
            next()
            return
        } else {
            res.sendStatus(HTTP_STATUSES.FORBIDDEN_403)
            return
        }
    }

    next()    
}

export const authorizatioDeviceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    const deviceId = req.params.deviceId
    const authSesionByToken = await authService.getSingleAuthSessionByToken(refreshToken)
    const authSessionByParams = await authService.getAuthSessionByDeviceId(deviceId)

    if (!authSessionByParams) return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    if (authSesionByToken && authSessionByParams) {
        if (authSesionByToken?.userId === authSessionByParams?.userId) {
            next()
            return
        }
    }

    res.sendStatus(HTTP_STATUSES.FORBIDDEN_403)
    return
}