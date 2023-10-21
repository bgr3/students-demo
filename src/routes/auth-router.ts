import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../settings";
import { usersService } from "../domain/user-service";
import { jwtService } from "../application/jwt-service";

export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
    
    let user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    
    if (!user) {
      res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
      return
    } 
    const token = await jwtService.createJWT(user)  
    res.status(HTTP_STATUSES.CREATED_201).send(token);
})

