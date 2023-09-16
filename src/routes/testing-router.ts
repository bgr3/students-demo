import {Request, Response, Router} from 'express'
import { videos } from './videos-router'

export const testingRouter = Router()

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videos.splice(0);
    res.sendStatus(204);
})