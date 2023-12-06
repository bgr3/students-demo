import { PostPostType, PostPutType, PostType } from "../types/post-types";
import { PostsRepository } from "../repositories/posts-repository/posts-db-repository";
import { BlogsQueryRepository } from "../repositories/blogs-repository/blogs-query-db-repository";
import { PostLikeStatus } from "../types/post-types";
import { AuthorizationValidation } from "../validation/authorization-validation";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class PostsService {
    constructor(
        protected authorizationValidation: AuthorizationValidation,
        protected postsRepository: PostsRepository,
        protected blogsQueryRepository: BlogsQueryRepository){}
    async testAllData (): Promise<void> {
        return await this.postsRepository.testAllData()
    }

    async createPost (body: PostPostType): Promise<string | null> {
        
        const blogName = await this.blogsQueryRepository.findBlogByID(body.blogId.trim())
        
        if (blogName){
            const newPost = new PostType(    
                body.title,
                body.shortDescription,
                body.content,
                body.blogId,
                blogName.name,
                new Date().toISOString(),
                []
            );
        
            const result = await this.postsRepository.createPost(newPost);
        
            return result
        }

        return null  

    }

    async updatePost (id: string, body: PostPutType): Promise<boolean> {
        
        const blogName = await this.blogsQueryRepository.findBlogByID(body.blogId.trim())
        
        const updatePost = {             
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName:  blogName?.name,
        }

        return this.postsRepository.updatePost(id, updatePost)
    }

    async likeStatus (commentId: string, accessToken: string, body: PostLikeStatus): Promise <boolean> {
        const user = await this.authorizationValidation.getUserByJWTAccessToken(accessToken)
        const userId = user!._id.toString()
        const login = user!.login
        const likeStatus = body.likeStatus
        return await this.postsRepository.setLikeStatus(commentId, userId, login, likeStatus)
    }

    async deletePost (id: string): Promise<boolean> {
        return this.postsRepository.deletePost(id)
    }
}

function findBlogById(arg0: string) {
    throw new Error("Function not implemented.");
}


