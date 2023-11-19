import { blogsRepository } from "../repositories/blogs-repository/blogs-db-repository"
import { BlogPostType, BlogPutType } from "../types/blog-types"



export const blogsService = {
    async testAllData (): Promise<void> {
        return blogsRepository.testAllData()
    },

    async createBlog (body: BlogPostType): Promise<string | null> {     
        const newblog = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        };
        
        return await blogsRepository.createBlog(newblog)
    },

    async updateBlog (id: string, body: BlogPutType): Promise<Boolean> {
        
        const updateBlog = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
        };
        
        return await blogsRepository.updateBlog(id, updateBlog)
    },

    async deleteBlog (id: string): Promise<Boolean> {
        return blogsRepository.deleteBlog(id)
    }
}
