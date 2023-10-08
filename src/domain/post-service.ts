import { PostDb, PostOutput, PostPaginatorType, PostPostType, PostPutType, PostType } from "../types/post-types";
import { blogsService } from "./blog-service";
import { postsRepository } from "../repositories/posts-db-repository";
import { blogsRepository } from "../repositories/blogs-db-repository";

export const postFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }

export const postsService = {
    async testAllData (): Promise<void> {
        return await postsRepository.testAllData()
    },

    async findPosts (blogId: string | null, filterService:any = postFilter): Promise<PostPaginatorType> {
        const posts = await postsRepository.findPosts(blogId, filterService)
        return posts
    },

    async findPostById (id: string): Promise<PostOutput | null> {
        const post = await postsRepository.findPostByID(id);

        return post

    },

    async createPost (body: PostPostType): Promise<string | null> {

        const blogName = await blogsRepository.findBlogByID(body.blogId.trim())

        const newPost = {    
            title: body.title.trim(),
            shortDescription: body.shortDescription.trim(),
            content: body.content.trim(),
            blogId: body.blogId.trim(),
            blogName:  blogName?.name || null,
            createdAt: new Date().toISOString(),
        };

        const result = await postsRepository.createPost(newPost);
        
        return result
    },

    async updatePost (id: string, body: PostPutType): Promise<boolean> {
        
        const blogName = await blogsService.findBlogByID(body.blogId.trim())
        
        const updatePost = {             
            title: body.title.trim(),
            shortDescription: body.shortDescription.trim(),
            content: body.content.trim(),
            blogId: body.blogId.trim(),
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


