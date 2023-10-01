import { checkBlogs } from "../validation/--NO check-blogs"; 
import { BlogPostType, BlogPutType, BlogType } from "../types/blog-types";
import { blogsCollection } from "../db/db";

export const blogsRepository = {
    async testAllData (): Promise<void> {
        const result = await blogsCollection.deleteMany({})
        console.log('blogs delete: ', result.deletedCount)
    },

    async findBlogs (): Promise<BlogType[]> {
        return await blogsCollection.find().toArray()
    },

    async findBlogByID (id: string): Promise<BlogType | null> {
        
        let blog: BlogType | null = await blogsCollection.findOne({id: id});
        
        if (blog){
            return blog
        } else {
            return null
        }
        
    },

    async createBlog (body: BlogPostType): Promise<string | null> {
        const blogs = await blogsCollection.find().toArray()
        const newblog = {
            id: blogs.length > 0 ? (+blogs[blogs.length - 1].id + 1).toString() : '1', 
            name: body.name.trim(),
            description: body.description.trim(),
            websiteUrl: body.websiteUrl.trim(),
            createdAt: new Date().toLocaleString().split(', ').join('-'),
            isMembership: false,
        };

        console.log(newblog.createdAt)

        const result = await blogsCollection.insertOne(newblog);
        console.log(result.insertedId)
        if (result.insertedId) {
            return newblog.id
        } else {
            return null
        }
    },

    async updateBlog (id: string, body: BlogPutType): Promise<Boolean> {
        
        const result = await blogsCollection.updateOne({id: id}, { $set: {
            name: body.name.trim(),
            description: body.description.trim(),
            websiteUrl: body.websiteUrl.trim(),
        }});
        
        if (result.matchedCount) {
            return true
        } else { 
            return false
        }
    },

    async deleteBlog (id: string): Promise<Boolean> {

        const result = await blogsCollection.deleteOne({id: id})
        
        if (result.deletedCount) {
            return true
        }
        return false
    }
}