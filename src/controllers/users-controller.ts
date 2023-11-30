import {Request, Response} from 'express'
import { UsersService } from "../domain/user-service";
import { userCheckQuery } from "../features/user-features";
import { UsersQueryRepository } from "../repositories/users-repository/users-query-db-repository";
import { HTTP_STATUSES } from "../settings";

export class UsersController {
    constructor(
        protected usersQueryRepository: UsersQueryRepository,
        protected usersService: UsersService){}
    async createUser (req: Request, res: Response)  {
      
      let result = await this.usersService.createUser(req.body.login, req.body.email, req.body.password, true)
      
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
    
      const foundBlog = await this.usersService.deleteUser(req.params.id)
    
      if (foundBlog) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  }