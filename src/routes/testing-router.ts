import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings'
import { videosRepository } from '../repositories/videos-repository'
import { blogsRepository } from '../repositories/blogs-db-repository'
import { postsRepository } from '../repositories/posts-db-repository'

export const testingRouter = Router()

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    videosRepository.testAllData
    await blogsRepository.testAllData()
    await postsRepository.testAllData()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})