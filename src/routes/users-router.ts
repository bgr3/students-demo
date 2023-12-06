import { Router } from 'express'
import { authenticationMiddleware } from '../middlewares/authorization-middleware';
import { inputValidationMiddleware, userInputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { container } from '../ioc-containers/ioc-container';
import { UsersController } from '../controllers/users-controller';

const usersController = container.get(UsersController)

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