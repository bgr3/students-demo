import { Request, Response, NextFunction } from "express";
import { HTTP_STATUSES } from "../settings";
import { container } from "../ioc-containers/ioc-container";
import { AccessService } from "../domain/access-service";

const accessService = container.get<AccessService>(AccessService)

export const accessFrequencyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const result = await accessService.checkaccessFrequency(req.url, req.ip)

    if (result) {
        next()
    } else {
        res.sendStatus(HTTP_STATUSES.TOO_MANY_REQUESTS_429)
    }
  
}