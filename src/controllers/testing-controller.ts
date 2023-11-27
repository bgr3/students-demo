import { Request, Response } from 'express'
import { HTTP_STATUSES } from '../settings'
import { BlogsService } from '../domain/blog-service'
import { PostsService } from '../domain/post-service'
import { videosRepository } from '../repositories/video-repository/videos-repository'
import { usersService } from '../domain/user-service'
import { CommentsService } from '../domain/comment-service'
import { accessService } from '../domain/access-service'
import { AuthService } from '../domain/auth-service'

export class TestingRouterController {
    constructor(
        protected blogsService: BlogsService,
        protected postsService: PostsService,
        protected commentsService: CommentsService,
        protected authService: AuthService
    ){}
    async allData(req: Request, res: Response) { 
        videosRepository.testAllData
        await this.blogsService.testAllData()
        await this.postsService.testAllData()
        await usersService.testAllData()
        await this.commentsService.testAllData()
        await accessService.testAllData()
        await this.authService.testAllData()
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
}