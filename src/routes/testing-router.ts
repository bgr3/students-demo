import {Router} from 'express'
import { videos } from './videos-router'

export const addressesRouter = Router()

addressesRouter.delete('/all-data', (req: Request, res: Response) => {
    videos = [];
    res.sendStatus(204);
    
})