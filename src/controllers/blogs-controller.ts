import { Request, Response } from 'express'
import { BlogsService } from '../domain/blog-service';
import { blogCheckQuery } from '../features/blog-features';
import { postCheckQuery } from '../features/post-features';
import { BlogsQueryRepository } from '../repositories/blogs-repository/blogs-query-db-repository';
import { PostsQueryRepository } from '../repositories/posts-repository/posts-query-db-repository';
import { HTTP_STATUSES } from '../settings';
import { PostsService } from '../domain/post-service';
import { injectable } from 'inversify';
import "reflect-metadata";
import { BlogsQueryRepository2 } from "../controllers/new-class-test3";

@injectable()
export class BlogsController {
    constructor(
        protected blogsService: BlogsService,
        protected blogsQueryRepository: BlogsQueryRepository,
        protected postsService: PostsService,
        protected postsQueryRepository: PostsQueryRepository
    ){}
    async createBlog(req: Request, res: Response) {
    
      let result = await this.blogsService.createBlog(req.body)
      
      if (result) {
        const newBlog = await this.blogsQueryRepository.findBlogByID(result)
        res.status(HTTP_STATUSES.CREATED_201).send(newBlog);
      } else {
        res.status(HTTP_STATUSES.BAD_REQUEST_400)
      }
    }
    async createPostforBlog(req: Request, res: Response) {
      req.body.blogId = req.params.id.toString()
      
      let result = await this.postsService.createPost(req.body)
      
      if (!result) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
      } 
      
      const newPost = await this.postsQueryRepository.findPostByID(result)
        
      res.status(HTTP_STATUSES.CREATED_201).send(newPost);
    }
    async getBlogs(req: Request, res: Response) {
      const queryFilter = blogCheckQuery(req.query)
      
      res.status(HTTP_STATUSES.OK_200).send(await this.blogsQueryRepository.findBlogs(queryFilter));
      //res.status(HTTP_STATUSES.OK_200).send(await this.BlogsQueryRepository.findBlogs(queryFilter))
    }
    async getBlog(req: Request, res: Response) {
    
      const foundBlog = await this.blogsQueryRepository.findBlogByID(req.params.id)
    
      if (foundBlog) {      
        res.status(HTTP_STATUSES.OK_200).send(foundBlog);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
    async getPostsforBlog(req: Request, res: Response) {
      const foundBlog = await this.blogsQueryRepository.findBlogByID(req.params.id)
      const queryFilter = postCheckQuery(req.query)
      
      const posts = await this.postsQueryRepository.findPosts(req.params.id, queryFilter)
    
      if (!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
      } else {
        res.status(HTTP_STATUSES.OK_200).send(posts);
      } 
    }
    async updateBlog(req: Request, res: Response) {
    
      const foundBlog = await this.blogsQueryRepository.findBlogByID(req.params.id)
      if (foundBlog) {
        const updatedBlog = await this.blogsService.updateBlog(req.params.id, req.body) 
        
        if (updatedBlog) {
          res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        } else {
          res.status(HTTP_STATUSES.BAD_REQUEST_400);
        }
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
    async deleteBlog(req: Request, res: Response) {
    
      const foundBlog = await this.blogsService.deleteBlog(req.params.id)
    
      if (foundBlog) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  }