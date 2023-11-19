import { PostPostType, PostPutType, PostType } from "../../types/post-types";
import { blogsRepository } from "../blogs-repository/blogs-in-memory-repository";


const posts: any = [];

export const postsRepository = {
    async testAllData (): Promise<void> {
        posts.splice(0)
    },

    async findPosts (): Promise<PostType[]> {
        return posts
    },

    async findPostByID (id: string): Promise<PostType | null> {
        
        let post = posts.find((i: {id: string}) => i.id === id);
        
        if (post){
            return post
        } else {
            return null
        }
        
    },

    async createPost (body: PostPostType): Promise<string | null> {
        const blogName = await blogsRepository.findBlogByID(body.blogId.trim())
        
        const newpost = {
            id: posts.length > 0 ? (+posts[posts.length - 1].id + 1).toString() : '1', 
            title: body.title.trim(),
            shortDescription: body.shortDescription.trim(),
            content: body.content.trim(),
            blogId: body.blogId.trim(),
            blogName:  blogName?.name,
        };
        
        posts.push(newpost);
        
        return newpost.id
    },

    async updatePost (id: string, body: PostPutType): Promise<boolean> {
        let post = posts.find((i: {id: string}) => i.id === id);

        const blogName = await blogsRepository.findBlogByID(body.blogId.trim())
        
        post.title = body.title.trim();
        post.shortDescription = body.shortDescription.trim();
        post.content = body.content.trim();
        post.blogId = body.blogId.trim();
        post.blogName =  blogName?.name;
        
        return true
    },

    async deletePost (id: string): Promise<boolean> {
        
        for (let i = 0; i < posts.length; i++){
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true
            }
        }
        
        return false
    }
}

function findBlogById(arg0: string) {
    throw new Error("Function not implemented.");
}
