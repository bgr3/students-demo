import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings'
import { videosRepository } from '../repositories/videos-repository'

export const testingRouter = Router()

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videosRepository.testAllData
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})