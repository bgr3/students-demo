import { UsersController } from "../controllers/users-controller";
import { UsersService } from "../domain/user-service";
import { UsersRepository } from "../repositories/users-repository/users-db-repository";
import { UsersQueryRepository } from "../repositories/users-repository/users-query-db-repository";

// const usersRepository = new UsersRepository()
// export const usersService = new UsersService(usersRepository)
// const usersQueryRepository = new UsersQueryRepository()
// export const usersController = new UsersController(usersQueryRepository, usersService)