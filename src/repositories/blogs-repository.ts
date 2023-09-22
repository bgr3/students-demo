import { checkBlogs } from "../check/check-blogs"; 
import { BlogPostType, BlogPutType } from "../models/blog-types";


const blogs: any = [];

export const blogsRepository = {
    testAllData () {
        blogs.splice(0)
    },

    findBlogs () {
        return blogs
    },

    findBlogByID (id: number) {
        let blog = blogs.find((i: {id: number}) => i.id === id);
        if (blog){
            blog.id = blog.id.toString()
            return blog
        } else {
            return false
        }
        
    },

    createBlog (body: BlogPostType) {
        if (checkBlogs(body).check){
            const newblog = {
                id: blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1, 
                name: body.name.trim(),
                description: body.description.trim(),
                websiteUrl: body.websiteUrl.trim(),
            };
            blogs.push(newblog);
            return newblog.id
        } else {
            return false
        }
    },

    updateBlog (id: number, body: BlogPutType) {
        let blog = blogs.find((i: {id: number}) => i.id === id);
        if (checkBlogs(body).check) {
            blog.name = body.name.trim();
            blog.description = body.description.trim();
            blog.websiteUrl = body.websiteUrl.trim();
            return true
        } else { 
            return false
        }
    },

    deleteBlog (id: number) {
        for (let i = 0; i < blogs.length; i++){
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true
            }
        }
        return false
    }
}