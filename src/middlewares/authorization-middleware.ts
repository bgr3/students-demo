import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../settings";
import { checkAuthorization, checkJWTAuthorization } from "../validation/authorization-validation";

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    if (await checkAuthorization(req.headers.authorization)){
        next()
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
}

export const authorizationJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = await checkJWTAuthorization(req.headers.authorization)
    if (user){
        req.user = user
        next()
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
}