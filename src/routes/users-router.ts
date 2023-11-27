import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings';
import { usersService } from '../domain/user-service';
import { authenticationMiddleware } from '../middlewares/authorization-middleware';
import { inputValidationMiddleware, userInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { userCheckQuery } from '../features/user-features';
import { UsersQueryRepository } from '../repositories/users-repository/users-query-db-repository';

class UsersController {
  usersQueryRepository: UsersQueryRepository
  constructor(){
    this.usersQueryRepository = new UsersQueryRepository()
  }
  async createUser (req: Request, res: Response)  {
    
    let result = await usersService.createUser(req.body.login, req.body.email, req.body.password, true)
    
    if (!result) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400);
      return
    } 

    const newUser = await this.usersQueryRepository.findUserByID(result)
      
    res.status(HTTP_STATUSES.CREATED_201).send(newUser);
  }
  async getUsers(req: Request, res: Response)  {
    const queryFilter = userCheckQuery(req.query)
    
    res.status(HTTP_STATUSES.OK_200).send(await this.usersQueryRepository.findUsers(queryFilter));
  }
  async deleteUser(req: Request, res: Response)  {
  
    const foundBlog = await usersService.deleteUser(req.params.id)
  
    if (foundBlog) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  }
}

const usersController = new UsersController()

export const usersRouter = Router({});

usersRouter.post('/',  
authenticationMiddleware,
userInputValidationMiddleware(),
inputValidationMiddleware,  
usersController.createUser.bind(usersController)
)

usersRouter.get('/',
  authenticationMiddleware,
  usersController.getUsers.bind(usersController)
  
)

usersRouter.delete('/:id',
  authenticationMiddleware,
  usersController.deleteUser.bind(usersController)
  )