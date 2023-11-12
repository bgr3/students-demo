import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../settings";
import { authService } from "../domain/auth-service";
import { authenticationRefreshJWTMiddleware, authorizatioDeviceMiddleware } from "../middlewares/authorization-middleware";

export const securityRouter = Router({});

securityRouter.get('/devices',
authenticationRefreshJWTMiddleware,
async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    const sessions = await authService.getAuthSessionsByToken(refreshToken)

    if (sessions) {
        return res.status(HTTP_STATUSES.OK_200).send(sessions)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }    
})

securityRouter.delete('/devices',
authenticationRefreshJWTMiddleware,
async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    const result = await authService.deleteAuthSessionsExcludeCurent(refreshToken)

    if (result) {
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }    
})

securityRouter.delete('/devices/:deviceId',
authenticationRefreshJWTMiddleware,
authorizatioDeviceMiddleware,
async (req: Request, res: Response) => {
    const result = await authService.deleteSpecifiedAuthSessionByDeviceId(req.params.deviceId)

    if (result) {
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }    
})