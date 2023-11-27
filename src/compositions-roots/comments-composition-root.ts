import { CommentsController } from "../controllers/comments-controller"
import { CommentsService } from "../domain/comment-service"
import { CommentsRepository } from "../repositories/comments-repository/comments-db-repository"
import { CommentsQueryRepository } from "../repositories/comments-repository/comments-query-db-repository"
import { PostsRepository } from "../repositories/posts-repository/posts-db-repository"
import { PostsQueryRepository } from "../repositories/posts-repository/posts-query-db-repository"

const commentsRepository = new CommentsRepository()
const postsRepository = new PostsRepository()
const postsQueryRepository = new PostsQueryRepository()
export const commentsService = new CommentsService(commentsRepository, postsRepository, postsQueryRepository)
const commentsQueryRepository = new CommentsQueryRepository()
export const commentsController = new CommentsController(commentsService, commentsQueryRepository)