import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../settings";
import { usersService } from "../domain/user-service";
import { jwtService } from "../application/jwt-service";
import { authenticationJWTMiddleware } from "../middlewares/authorization-middleware";
import { UserMe } from "../types/user-types";

export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
    
    let user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    
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
    "login": req.user!.email,
    "userId": req.user!.id
  } 
  res.status(HTTP_STATUSES.OK_200).send(user)
})