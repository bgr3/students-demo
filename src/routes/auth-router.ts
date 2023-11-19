import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../settings";
import { usersService } from "../domain/user-service";
import { authenticationJWTMiddleware, authenticationRefreshJWTMiddleware } from "../middlewares/authorization-middleware";
import { authService } from "../domain/auth-service";
import { authInputValidationMiddleware, authReSendValidationMiddleware, authRecoveryPasswordMiddleware, authRecoveryPasswordSendMiddleware, inputValidationMiddleware, userInputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { accessFrequencyMiddleware } from "../middlewares/access-middleware";


export const authRouter = Router({});

authRouter.post('/login',
accessFrequencyMiddleware,
async (req: Request, res: Response) => {
    const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)

    if (!user) {
      res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
      return
    } 

    //if (!user.emailConfirmation.isConfirmed) {}  //what there?

    const deviceName: string = req.header("User-Agent") ? req.header("User-Agent")! : 'unknown device'

    const tokens = await authService.createAuthSession(user._id.toString(), req.ip, deviceName)

    res.cookie('refreshToken', tokens!.refreshToken, {httpOnly: true, secure: true})  
    res.status(HTTP_STATUSES.OK_200).send({accessToken: tokens!.accessToken}); 
})

authRouter.post('/password-recovery', 
accessFrequencyMiddleware,
authRecoveryPasswordSendMiddleware(),
inputValidationMiddleware,
async (req: Request, res: Response) => {
  
  const userId = await usersService.updateCodeForRecoveryPassword(req.body.email)
  

  if(userId) {
    const result = await authService.changePasswordEmail(userId)  
  }
  
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

authRouter.post('/new-password',
accessFrequencyMiddleware,
authRecoveryPasswordMiddleware(),  
inputValidationMiddleware,
async (req: Request, res: Response) => {
    const result = await usersService.changePassword(req.body.recoveryCode, req.body.newPassword)

    if (result) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})

authRouter.post('/refresh-token', 
authenticationRefreshJWTMiddleware,
async (req: Request, res: Response) => {

  const oldRefreshToken = req.cookies.refreshToken

  const tokens = await authService.updateTokens(oldRefreshToken)

  if (tokens) {
    res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, secure: true})  
    res.status(HTTP_STATUSES.OK_200).send({accessToken: tokens!.accessToken}); 
    return 
  } else {
    return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
  }  
})

authRouter.post('/logout', 
authenticationRefreshJWTMiddleware,
async (req: Request, res: Response) => {
  const oldRefreshToken = req.cookies.refreshToken

  const result = await authService.deleteAuthSessionByToken(oldRefreshToken)

  if (result) {
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204); 
  } else {
    return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
  }
})



authRouter.get('/me',
authenticationJWTMiddleware,
async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization!.split(' ')[1]
  let me = await authService.getMeByToken(accessToken)
  res.status(HTTP_STATUSES.OK_200).send(me)
})

authRouter.post('/registration',
  accessFrequencyMiddleware,
  userInputValidationMiddleware(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const result = await usersService.createUser(req.body.login, req.body.email, req.body.password)
    
    if (!result) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
      return
    } 

    const email = await authService.registerUserSendEmail(result)  

    if (email) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})

authRouter.post('/registration-confirmation',
  accessFrequencyMiddleware,
  authInputValidationMiddleware(),  
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.code)

    if (result) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})

authRouter.post('/registration-email-resending',
  accessFrequencyMiddleware,
  authReSendValidationMiddleware(),
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const result = await authService.ReSendEmail(req.body.email)

    if (result) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    }
})