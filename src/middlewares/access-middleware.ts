import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../settings";
import { accessService } from "../domain/access-service";

export const accessFrequencyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const result = await accessService.checkaccessFrequency(req.url, req.ip)

    if (result) {
        next()
    } else {
        res.sendStatus(HTTP_STATUSES.TOO_MANY_REQUESTS_429)
    }
}