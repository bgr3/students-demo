import { checkBlogs } from "../validation/--NO check-blogs"; 
import { BlogPostType, BlogPutType, BlogType } from "../types/blog-types";


const blogs: any = [];

export const blogsRepository = {
    async testAllData (): Promise<void> {
        blogs.splice(0)
    },

    async findBlogs (): Promise<BlogType[]> {
        return blogs
    },

    async findBlogByID (id: string): Promise<BlogType | null> {
        
        let blog = blogs.find((i: {id: string}) => i.id === id);
        
        if (blog){
            return blog
        } else {
            return null
        }
        
    },

    async createBlog (body: BlogPostType): Promise<string | null> {
        
        if (checkBlogs(body).check){
            const newblog = {
                id: blogs.length > 0 ? (+blogs[blogs.length - 1].id + 1).toString() : '1', 
                name: body.name.trim(),
                description: body.description.trim(),
                websiteUrl: body.websiteUrl.trim(),
            };
            blogs.push(newblog);
            return newblog.id
        } else {
            return null
        }
    },

    async updateBlog (id: string, body: BlogPutType): Promise<boolean> {
        
        let blog = blogs.find((i: {id: string}) => i.id === id);
        
        if (checkBlogs(body).check) {
            blog.name = body.name.trim();
            blog.description = body.description.trim();
            blog.websiteUrl = body.websiteUrl.trim();
            return true
        } else { 
            return false
        }
    },

    async deleteBlog (id: string): Promise<boolean> {
        
        for (let i = 0; i < blogs.length; i++){
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true
            }
        }
        return false
    }
}