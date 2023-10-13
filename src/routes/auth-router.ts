import { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../settings";
import { usersService } from "../domain/user-service";

export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
    
    let checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    
    if (!checkResult) {
      res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
      return
    } 
      
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

