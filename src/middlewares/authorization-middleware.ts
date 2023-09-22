import { Request, Response, NextFunction } from "express";
import { Buffer } from "buffer";
import { HTTP_STATUSES } from "../settings";

const users = [{login: 'admin', password: '12345678'}]

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authheader = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (authheader && authheader !==null) {
        const decode = Buffer.from(authheader, 'base64').toString("binary");
        const user = decode.split(':');
        if (users.find(i => i.login === user[0] && i.password === user[1])) {
            next();
        } else {
            res.sendStatus(HTTP_STATUSES.FORBIDDEN_403)
        }
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
}