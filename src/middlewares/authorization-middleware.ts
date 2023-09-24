import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../settings";
import { checkAuthorization } from "../check/check-authorization";

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (checkAuthorization(req.headers.authorization)){
        next();
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
}