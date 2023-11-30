import { Container } from "inversify";
import { AuthController } from "../controllers/auth-controller";
import { AuthService } from "../domain/auth-service";
import { AuthRepository } from "../repositories/auth-repository/auth-db-repository";
import { AuthQueryRepository } from "../repositories/auth-repository/auth-query-db-repository";
import { UsersRepository } from "../repositories/users-repository/users-db-repository";

// const authRepository = new AuthRepository()
// const authQueryRepository = new AuthQueryRepository()
// const usersRepository = new UsersRepository()
// export const authService = new AuthService(authRepository, authQueryRepository, usersRepository)
// export const authController = new AuthController(authService, usersService)

