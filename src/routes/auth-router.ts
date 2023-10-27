import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../settings";
import { usersService } from "../domain/user-service";
import { jwtService } from "../application/jwt-service";
import { authenticationJWTMiddleware } from "../middlewares/authorization-middleware";
import { UserMe } from "../types/user-types";
import { authService } from "../domain/auth-service";
import { authInputValidationMiddleware, authReSendValidationMiddleware, inputValidationMiddleware, userInputValidationMiddleware } from "../middlewares/input-validation-middleware";


export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
    
    let user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)

    if (user?.emailConfirmation.isConfirmed) {}  //what there?
    
    if (!user) {
      res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
      return
    } 
    const token = await jwtService.createJWT(user)  
    res.status(HTTP_STATUSES.OK_200).send(token); 
})

authRouter.get('/me',
authenticationJWTMiddleware,
async (req: Request, res: Response) => {
  let user: UserMe = {
    "email": req.user!.email,
    "login": req.user!.login,
    "userId": req.user!.id
  } 
  res.status(HTTP_STATUSES.OK_200).send(user)
})

authRouter.post('/registration',
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