import { Request, Response } from 'express'
import { HTTP_STATUSES } from '../settings'
import { BlogsService } from '../domain/blog-service'
import { PostsService } from '../domain/post-service'
import { videosRepository } from '../repositories/video-repository/videos-repository'
import { CommentsService } from '../domain/comment-service'
import { AccessService } from '../domain/access-service'
import { AuthService } from '../domain/auth-service'
import { UsersService } from '../domain/user-service'

export class TestingController {
    constructor(
        protected blogsService: BlogsService,
        protected postsService: PostsService,
        protected usersService: UsersService,
        protected commentsService: CommentsService,
        protected accessService: AccessService,
        protected authService: AuthService
    ){}
    async allData(req: Request, res: Response) { 
        videosRepository.testAllData
        await this.blogsService.testAllData()
        await this.postsService.testAllData()
        await this.usersService.testAllData()
        await this.commentsService.testAllData()
        await this.accessService.testAllData()
        await this.authService.testAllData()
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
}