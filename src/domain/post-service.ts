import { PostFilter, PostOutput, PostPaginatorType, PostPostType, PostPutType } from "../types/post-types";
import { blogsService } from "./blog-service";
import { postsRepository } from "../repositories/posts-db-repository";
import { blogsRepository } from "../repositories/blogs-db-repository";

export const postsService = {
    async testAllData (): Promise<void> {
        return await postsRepository.testAllData()
    },

    async findPosts (blogId?: string | null, filterService?: PostFilter): Promise<PostPaginatorType> {
        const posts = await postsRepository.findPosts(blogId, filterService)

        return posts
    },

    async findPostById (id: string): Promise<PostOutput | null> {
        const post = await postsRepository.findPostByID(id);

        return post

    },

    async createPost (body: PostPostType): Promise<string | null> {
        
        const blogName = await blogsRepository.findBlogByID(body.blogId.trim())
        
        if (blogName){
            const newPost = {    
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName:  blogName.name,
            createdAt: new Date().toISOString(),
            };
        
            const result = await postsRepository.createPost(newPost);
        
            return result
        }

        return null  

    },

    async updatePost (id: string, body: PostPutType): Promise<boolean> {
        
        const blogName = await blogsService.findBlogByID(body.blogId.trim())
        
        const updatePost = {             
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName:  blogName?.name,
        }

        return postsRepository.updatePost(id, updatePost)
    },

    async deletePost (id: string): Promise<boolean> {
        return postsRepository.deletePost(id)
    }
}

function findBlogById(arg0: string) {
    throw new Error("Function not implemented.");
}


