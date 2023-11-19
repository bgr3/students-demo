import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings';
import { usersService } from '../domain/user-service';
import { authenticationMiddleware } from '../middlewares/authorization-middleware';
import { inputValidationMiddleware, userInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { userCheckQuery } from '../features/user-features';
import { usersQueryRepository } from '../repositories/users-repository/users-query-db-repository';


export const usersRouter = Router({});

usersRouter.post('/',
  authenticationMiddleware,
  userInputValidationMiddleware(),
  inputValidationMiddleware,  
  async (req: Request, res: Response) => {
    
    let result = await usersService.createUser(req.body.login, req.body.email, req.body.password, true)
    
    if (!result) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
      return
    } 

    const newUser = await usersQueryRepository.findUserByID(result)
      
    res.status(HTTP_STATUSES.CREATED_201).send(newUser);
})

usersRouter.get('/',
  authenticationMiddleware,
  async (req: Request, res: Response) => {
    const queryFilter = userCheckQuery(req.query)
    
    res.status(HTTP_STATUSES.OK_200).send(await usersQueryRepository.findUsers(queryFilter));
})


usersRouter.delete('/:id',
  authenticationMiddleware,
  async (req: Request, res: Response) => {
  
    const foundBlog = await usersService.deleteUser(req.params.id)
  
    if (foundBlog) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})