import { checkPosts } from "../validation/--NO check-posts"; 
import { PostPostType, PostPutType, PostType } from "../types/post-types";
import { blogsRepository } from "./blogs-db-repository";
import { postsCollection } from "../db/db";

export const postsRepository = {
    async testAllData (): Promise<void> {
        const result = await postsCollection.deleteMany({})
        console.log('post delete: ', result.deletedCount)
    },

    async findPosts (): Promise<PostType[]> {
        return await postsCollection.find().toArray()
    },

    async findPostByID (id: string): Promise<PostType | null> {
        let post: PostType | null = await postsCollection.findOne({id: id});
        if (post){
            return post
        } else {
            return null
        }
        
    },

    async createPost (body: PostPostType): Promise<string | null> {
        const posts = await postsCollection.find().toArray()
        if (checkPosts(body).check){

            const blogName = await blogsRepository.findBlogByID(body.blogId.trim())

            const newPost = {
                id: posts.length > 0 ? (+posts[posts.length - 1].id + 1).toString() : '1', 
                title: body.title.trim(),
                shortDescription: body.shortDescription.trim(),
                content: body.content.trim(),
                blogId: body.blogId.trim(),
                blogName:  blogName?.name || null,
                createdAt: new Date().toISOString(),
            };

            const result = await postsCollection.insertOne(newPost);
            console.log(result.insertedId)
            
            return newPost.id
        } else {
            return null
        }
    },

    async updatePost (id: string, body: PostPutType): Promise<boolean> {
        
        const blogName = await blogsRepository.findBlogByID(body.blogId.trim())
        
        const result = await postsCollection.updateOne({id: id}, { $set: {             
            title: body.title.trim(),
            shortDescription: body.shortDescription.trim(),
            content: body.content.trim(),
            blogId: body.blogId.trim(),
            blogName:  blogName?.name,
        }})

        if (result.matchedCount) {
            return true
        } else { 
            return false
        }
    },

    async deletePost (id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id: id})
        
        if (result.deletedCount) {
            return true
        }
        return false
    }
}

function findBlogById(arg0: string) {
    throw new Error("Function not implemented.");
}
