import { PostPostType, PostPutType } from "../types/post-types";
import { PostsRepository } from "../repositories/posts-repository/posts-db-repository";
import { BlogsQueryRepository } from "../repositories/blogs-repository/blogs-query-db-repository";

export class PostsService {
    constructor(
        protected postsRepository: PostsRepository,
        protected blogsQueryRepository: BlogsQueryRepository){}
    async testAllData (): Promise<void> {
        return await this.postsRepository.testAllData()
    }

    async createPost (body: PostPostType): Promise<string | null> {
        
        const blogName = await this.blogsQueryRepository.findBlogByID(body.blogId.trim())
        
        if (blogName){
            const newPost = {    
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName:  blogName.name,
            createdAt: new Date().toISOString(),
            };
        
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

    async deletePost (id: string): Promise<boolean> {
        return this.postsRepository.deletePost(id)
    }
}

function findBlogById(arg0: string) {
    throw new Error("Function not implemented.");
}


