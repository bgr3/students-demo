import { Request, Response } from "express";
import { AuthService } from "../domain/auth-service";
import { usersService } from "../domain/user-service";
import { HTTP_STATUSES } from "../settings";

export class AuthController {
    constructor(protected authService: AuthService){}
    async loginUser(req: Request, res: Response) {
      const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
  
      if (!user) {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
        return
      } 
  
      //if (!user.emailConfirmation.isConfirmed) {}  //what there?
  
      const deviceName: string = req.header("User-Agent") ? req.header("User-Agent")! : 'unknown device'
  
      const tokens = await this.authService.createAuthSession(user._id.toString(), req.ip, deviceName)
  
      res.cookie('refreshToken', tokens!.refreshToken, {httpOnly: true, secure: true})  
      res.status(HTTP_STATUSES.OK_200).send({accessToken: tokens!.accessToken}); 
    }
    async passwordRecovery(req: Request, res: Response) {
    
      const userId = await usersService.updateCodeForRecoveryPassword(req.body.email)
      
    
      if(userId) {
        const result = await this.authService.changePasswordEmail(userId)  
      }
      
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async newPassword(req: Request, res: Response) {
      const result = await usersService.changePassword(req.body.recoveryCode, req.body.newPassword)
  
      if (result) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
      } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
      }
    }
    async refreshTokens(req: Request, res: Response)  {
  
      const oldRefreshToken = req.cookies.refreshToken
    
      const tokens = await this.authService.updateTokens(oldRefreshToken)
    
      if (tokens) {
        res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, secure: true})  
        res.status(HTTP_STATUSES.OK_200).send({accessToken: tokens!.accessToken}); 
        return 
      } else {
        return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
      }  
    }
    async logout(req: Request, res: Response)  {
      const oldRefreshToken = req.cookies.refreshToken
    
      const result = await this.authService.deleteAuthSessionByToken(oldRefreshToken)
    
      if (result) {
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204); 
      } else {
        return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
      }
    }
    async aboutMe(req: Request, res: Response) {
      const accessToken = req.headers.authorization!.split(' ')[1]
      let me = await this.authService.getMeByToken(accessToken)
      res.status(HTTP_STATUSES.OK_200).send(me)
    }
    async registration(req: Request, res: Response)  {
      const result = await usersService.createUser(req.body.login, req.body.email, req.body.password)
      
      if (!result) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400);
        return
      } 
  
      const email = await this.authService.registerUserSendEmail(result)  
  
      if (email) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
      } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
      }
    }
    async registrationConfirmation(req: Request, res: Response)  {
      const result = await this.authService.confirmEmail(req.body.code)
  
      if (result) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
      } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
      }
    }
    async emailResending(req: Request, res: Response)  {
      const result = await this.authService.ReSendEmail(req.body.email)
  
      if (result) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
      } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
      }
    }
  }