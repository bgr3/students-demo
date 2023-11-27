import { BlogsController } from "../controllers/blogs-controller"
import { BlogsService } from "../domain/blog-service"
import { BlogsRepository } from "../repositories/blogs-repository/blogs-db-repository"
import { BlogsQueryRepository } from "../repositories/blogs-repository/blogs-query-db-repository"
import { PostsQueryRepository } from "../repositories/posts-repository/posts-query-db-repository"
import { postsService } from "./posts-composition-root"

const blogsRepository = new BlogsRepository()
const blogsQueryRepository = new BlogsQueryRepository()
export const blogsService = new BlogsService(blogsRepository)
const postsQueryRepository = new PostsQueryRepository()
export const blogsController = new BlogsController(blogsService, blogsQueryRepository, postsService, postsQueryRepository)