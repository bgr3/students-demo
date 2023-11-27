import { BlogsRepository } from "../repositories/blogs-repository/blogs-db-repository"
import { BlogPostType, BlogPutType } from "../types/blog-types"

export class BlogsService {
    constructor(protected blogsRepository: BlogsRepository){}
    async testAllData (): Promise<void> {
        return this.blogsRepository.testAllData()
    }

    async createBlog (body: BlogPostType): Promise<string | null> {     
        const newblog = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        };
        
        return await this.blogsRepository.createBlog(newblog)
    }

    async updateBlog (id: string, body: BlogPutType): Promise<Boolean> {
        
        const updateBlog = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
        };
        
        return await this.blogsRepository.updateBlog(id, updateBlog)
    }

    async deleteBlog (id: string): Promise<Boolean> {
        return this.blogsRepository.deleteBlog(id)
    }
}
