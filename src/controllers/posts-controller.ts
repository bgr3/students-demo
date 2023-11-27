import {Request, Response, Router} from 'express'
import { HTTP_STATUSES } from '../settings';
import { postCheckQuery } from '../features/post-features';
import { PostsService } from '../domain/post-service';
import { CommentsService } from '../domain/comment-service';
import { CommentsQueryRepository } from '../repositories/comments-repository/comments-query-db-repository';
import { PostsQueryRepository } from '../repositories/posts-repository/posts-query-db-repository';

export class PostsController {
    constructor(
        protected postsService: PostsService,
        protected commentsService: CommentsService,
        protected commentsQueryRepository: CommentsQueryRepository,
        protected postsQueryRepository: PostsQueryRepository
    ){}
    async createPost(req: Request, res: Response) {
    
      let result = await this.postsService.createPost(req.body)
      
      if (!result) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400);
        return
      } 
  
      const newPost = await this.postsQueryRepository.findPostByID(result)
        
      res.status(HTTP_STATUSES.CREATED_201).send(newPost);
    }
    async createCommentForPost(req: Request, res: Response) {
      const token = req.headers.authorization!
      const result = await this.commentsService.createComment(req.body, token, req.params.postId)
        if (!result) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400);
        return
      } 
  
      const newPost = await this.commentsQueryRepository.findCommentByID(result)
        
      res.status(HTTP_STATUSES.CREATED_201).send(newPost);
    }
    async getPosts(req: Request, res: Response) {  
      const queryFilter = postCheckQuery(req.query)
      
      res.status(HTTP_STATUSES.OK_200).send(await this.postsQueryRepository.findPosts(null, queryFilter));
    }
    async getPost(req: Request, res: Response) {
    
      const foundPost = await this.postsQueryRepository.findPostByID(req.params.id)
      
      if (foundPost) {      
        res.status(HTTP_STATUSES.OK_200).send(foundPost);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
    async getCommentsForPost(req: Request, res: Response) {     
      const queryFilter = postCheckQuery(req.query)
      const post = await this.postsQueryRepository.findPostByID(req.params.id)
    
      const foundcomments = await this.commentsQueryRepository.findComments(req.params.id, queryFilter)
      
      if (post) {      
        res.status(HTTP_STATUSES.OK_200).send(foundcomments);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
    async updatePost(req: Request, res: Response){
    
      const updatedPost = await this.postsService.updatePost(req.params.id, req.body) 
      
      if (!updatedPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
      }
  
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
    async deletePost(req: Request, res: Response) {
    
      const foundPost = await this.postsService.deletePost(req.params.id)
    
      if (foundPost) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  }