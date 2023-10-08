import { ObjectId } from "mongodb"
import { blogsRepository } from "../repositories/blogs-db-repository"
import { BlogDb, BlogOutput, BlogPaginatorType, BlogPostType, BlogPutType, BlogType } from "../types/blog-types"

export const blogFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }

export const blogsService = {
    async testAllData (): Promise<void> {
        return blogsRepository.testAllData()
    },

    async findBlogs (filterService:any = blogFilter): Promise<BlogPaginatorType> {
        const blogs = await blogsRepository.findBlogs(filterService)
        return blogs
    },

    async findBlogByID (id: string): Promise<BlogType | null> {
        const blog = await blogsRepository.findBlogByID(id)

        return blog
    },

    async createBlog (body: BlogPostType): Promise<string | null> {     
        const newblog = {
            name: body.name.trim(),
            description: body.description.trim(),
            websiteUrl: body.websiteUrl.trim(),
            createdAt: new Date().toISOString(),
            isMembership: false,
        };
        
        return await blogsRepository.createBlog(newblog)
    },

    async updateBlog (id: string, body: BlogPutType): Promise<Boolean> {
        
        const updateBlog = {
            name: body.name.trim(),
            description: body.description.trim(),
            websiteUrl: body.websiteUrl.trim(),
        };
        
        return await blogsRepository.updateBlog(id, updateBlog)
    },

    async deleteBlog (id: string): Promise<Boolean> {
        return blogsRepository.deleteBlog(id)
    }
}
