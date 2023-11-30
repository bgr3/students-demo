import { Container } from "inversify";
import { AuthController } from "../controllers/auth-controller";
import { AuthService } from "../domain/auth-service";
import { AuthRepository } from "../repositories/auth-repository/auth-db-repository";
import { AuthQueryRepository } from "../repositories/auth-repository/auth-query-db-repository";
import { UsersRepository } from "../repositories/users-repository/users-db-repository";
import { BlogsController } from "../controllers/blogs-controller";
import { BlogsService } from "../domain/blog-service";
import { BlogsRepository } from "../repositories/blogs-repository/blogs-db-repository";
import { BlogsQueryRepository } from "../repositories/blogs-repository/blogs-query-db-repository";
import { PostsQueryRepository } from "../repositories/posts-repository/posts-query-db-repository";
import { CommentsController } from "../controllers/comments-controller";
import { CommentsService } from "../domain/comment-service";
import { CommentsRepository } from "../repositories/comments-repository/comments-db-repository";
import { CommentsQueryRepository } from "../repositories/comments-repository/comments-query-db-repository";
import { PostsRepository } from "../repositories/posts-repository/posts-db-repository";
import { PostsController } from "../controllers/posts-controller";
import { PostsService } from "../domain/post-service";
import { SecurityController } from "../controllers/security-controller";
import { TestingController } from "../controllers/testing-controller";
import { AccessService } from "../domain/access-service";
import { LogRepository } from "../repositories/access-repository/access-log-db-repository";
import { UsersController } from "../controllers/users-controller";
import { UsersService } from "../domain/user-service";
import { UsersQueryRepository } from "../repositories/users-repository/users-query-db-repository";
import "reflect-metadata";

export const container = new Container();
//auth
container.bind(AuthController).to(AuthController)
container.bind(AuthService).to(AuthService)
container.bind(UsersRepository).to(UsersRepository)
container.bind(AuthQueryRepository).to(AuthQueryRepository)
container.bind(AuthRepository).to(AuthRepository)
//blogs
container.bind(BlogsController).to(BlogsController)
container.bind(PostsQueryRepository).to(PostsQueryRepository)
container.bind(BlogsService).to(BlogsService)
container.bind(BlogsQueryRepository).to(BlogsQueryRepository)
container.bind(BlogsRepository).to(BlogsRepository)
//comments
container.bind(CommentsController).to(CommentsController)
container.bind(CommentsQueryRepository).to(CommentsQueryRepository)
container.bind(CommentsService).to(CommentsService)
container.bind(PostsQueryRepository).to(PostsQueryRepository) //twice
container.bind(PostsRepository).to(PostsRepository)
container.bind(CommentsRepository).to(CommentsRepository)
//posts
container.bind(PostsController).to(PostsController)
container.bind(CommentsQueryRepository).to(CommentsQueryRepository) //twice
container.bind(PostsQueryRepository).to(PostsQueryRepository) //twice
container.bind(PostsService).to(PostsService)
container.bind(BlogsQueryRepository).to(BlogsQueryRepository) //twicce
container.bind(PostsRepository).to(PostsRepository) //twice
//security
container.bind(SecurityController).to(SecurityController)
//testing
container.bind(TestingController).to(TestingController)
container.bind(AccessService).to(AccessService)
container.bind(LogRepository).to(LogRepository)
//users
container.bind(UsersController).to(UsersController)
container.bind(UsersQueryRepository).to(UsersQueryRepository)
container.bind(UsersService).to(UsersService)
container.bind(UsersRepository).to(UsersRepository) //twice