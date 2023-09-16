import {Request, Response, Router} from 'express'
import {checkVideos} from './check-videos'

export const videosRouter = Router({});

export const videos: any = [];

videosRouter.post('/', (req: Request, res: Response) => {
  if (checkVideos(req).check) {
    const date = new Date()
    const newVideos = {
      id: videos.length > 0 ? videos[videos.length - 1].id + 1 : 1, 
      title: req.body.title,
      author: req.body.author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: date.toISOString(),
      publicationDate: new Date(date.setDate(date.getDate() + 1)).toISOString(),
      availableResolutions: req.body.availableResolutions,
    };
    videos.push(newVideos);
    res.status(201).send(newVideos);
  } else {
    res.status(400).send(checkVideos(req).errors);
  }
})

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos);
})

videosRouter.get('/:id', (req: Request, res: Response) => {
  if (req.params.id) {
    let findId = videos.find((i: any) => i.id === +req.params.id);
    if (findId){      
      res.status(200).send(findId);
    } else{
      res.sendStatus(404);
    }    
  } else {
    res.status(200).send(videos);
  }
})

videosRouter.put('/:id', (req: Request, res: Response) => {
    let video = videos.find((i: any) => i.id === +req.params.id);
    if (video) {
      if (checkVideos(req).check) {
        video.title = req.body.title;
        video.author = req.body.author;
        video.canBeDownloaded = req.body.canBeDownloaded;
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = req.body.publicationDate;
        video.availableResolutions = req.body.availableResolutions;
        res.sendStatus(204);
      } else {
        res.status(400).send(checkVideos(req).errors);
      }
    } else {
      res.sendStatus(404);
    }
})  
  
videosRouter.delete('/:id', (req: Request, res: Response) => {
  let findId = videos.findIndex((i: any) => i.id === +req.params.id)
  if (findId >= 0) {
    videos.splice(findId, 1);
    res.sendStatus(204);
  } else {
  res.sendStatus(404);
  }
})