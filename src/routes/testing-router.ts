import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings'
import { blogsService } from '../domain/blog-service'
import { postsService } from '../domain/post-service'
import { videosRepository } from '../repositories/videos-repository'
import { usersService } from '../domain/user-service'

export const testingRouter = Router()

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    videosRepository.testAllData
    await blogsService.testAllData()
    await postsService.testAllData()
    await usersService.testAllData()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})