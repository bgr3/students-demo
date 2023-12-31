import {Request, Response, Router} from 'express'
import {checkVideos} from '../validation/check-videos'
import { HTTP_STATUSES } from '../settings';
import { videosRepository } from '../repositories/video-repository/videos-repository';

export const videosRouter = Router({});

videosRouter.post('/', (req: Request, res: Response) => {
  
  let checkRequest = videosRepository.createVideo(req.body)
  
  if (checkRequest) {
    const newVideo = videosRepository.findVideoByID(checkRequest)
    
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo);
  } else {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(checkVideos(req.body).errors);
  }
})

videosRouter.get('/', (req: Request, res: Response) => {
  res.status(HTTP_STATUSES.OK_200).send(videosRepository.findVideos());
})

videosRouter.get('/:id', (req: Request, res: Response) => {
  
  const foundVideo = videosRepository.findVideoByID(+req.params.id)
 
  if (foundVideo) {      
    res.status(HTTP_STATUSES.OK_200).send(foundVideo);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})

videosRouter.put('/:id', (req: Request, res: Response) => {
  
  const foundVideo = videosRepository.findVideoByID(+req.params.id)
  
  if (foundVideo) {
    
    const updatedVideo = videosRepository.updateVideo(+req.params.id, req.body) 
    
    if (updatedVideo) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      res.status(HTTP_STATUSES.BAD_REQUEST_400).send(checkVideos(req.body).errors);
    }
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})  
  
videosRouter.delete('/:id', (req: Request, res: Response) => {
  
  const foundVideo = videosRepository.deleteVideo(+req.params.id)
  
  if (foundVideo) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  } else {
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
})