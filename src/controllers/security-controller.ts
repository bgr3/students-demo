import { Request, Response } from "express";
import { AuthService } from "../domain/auth-service"
import { HTTP_STATUSES } from "../settings";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class SecurityController {
    constructor(protected authService: AuthService){}
    async getDevices(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken
        const sessions = await this.authService.getAuthSessionsByToken(refreshToken)
    
        if (sessions) {
            return res.status(HTTP_STATUSES.OK_200).send(sessions)
        } else {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }    
    }
    async deleteDevices(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken
        const result = await this.authService.deleteAuthSessionsExcludeCurent(refreshToken)
    
        if (result) {
            return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }    
    }
    async deleteDevice(req: Request, res: Response) {
        const result = await this.authService.deleteSpecifiedAuthSessionByDeviceId(req.params.deviceId)
    
        if (result) {
            return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }    
    }
}