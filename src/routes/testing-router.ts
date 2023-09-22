import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings'
import { videosRepository } from '../repositories/videos-repository'
import { blogsRepository } from '../repositories/blogs-repository'
import { postsRepository } from '../repositories/posts-repository'

export const testingRouter = Router()

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videosRepository.testAllData
    blogsRepository.testAllData
    postsRepository.testAllData
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})