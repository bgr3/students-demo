import { PostsController } from "../controllers/posts-controller"
import { PostsService } from "../domain/post-service"
import { BlogsQueryRepository } from "../repositories/blogs-repository/blogs-query-db-repository"
import { CommentsQueryRepository } from "../repositories/comments-repository/comments-query-db-repository"
import { PostsRepository } from "../repositories/posts-repository/posts-db-repository"
import { PostsQueryRepository } from "../repositories/posts-repository/posts-query-db-repository"

// const postsRepository = new PostsRepository()
// const blogsQueryRepository = new BlogsQueryRepository()
// export const postsService = new PostsService(postsRepository, blogsQueryRepository)
// const postsQueryRepository = new PostsQueryRepository()
// const commentsQueryRepository = new CommentsQueryRepository()
// export const postsController = new PostsController(postsService, commentsService, commentsQueryRepository, postsQueryRepository)