import {Request, Response, Router} from 'express'
import { videos } from './videos-router'
import { HTTP_STATUSES } from '../settings'

export const testingRouter = Router()

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videos.splice(0);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})