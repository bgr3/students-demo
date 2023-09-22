import { checkPosts } from "../check/check-posts"; 
import { PostPostType, PostPutType } from "../models/post-types";
import { blogsRepository } from "./blogs-repository";


const posts: any = [];

export const postsRepository = {
    testAllData () {
        posts.splice(0)
    },

    findPosts () {
        return posts
    },

    findPostByID (id: string) {
        let post = posts.find((i: {id: string}) => i.id === id);
        if (post){
            return post
        } else {
            return false
        }
        
    },

    createPost (body: PostPostType) {
        if (checkPosts(body).check){
            const newpost = {
                id: posts.length > 0 ? (posts[posts.length - 1].id + 1).toString() : '1', 
                title: body.title.trim(),
                shortDescription: body.shortDescription.trim(),
                content: body.content.trim(),
                blogId: body.blogId.trim(),
                blogName:  blogsRepository.findBlogByID(body.blogId.trim()).name,
            };
            posts.push(newpost);
            return newpost.id
        } else {
            return false
        }
    },

    updatePost (id: string, body: PostPutType) {
        let post = posts.find((i: {id: string}) => i.id === id);
        if (checkPosts(body).check) {
            post.title = body.title.trim();
            post.shortDescription = body.shortDescription.trim();
            post.content = body.content.trim();
            post.blogId = body.blogId.trim();
            post.blogName =  blogsRepository.findBlogByID(body.blogId.trim()).name;
            return true
        } else { 
            return false
        }
    },

    deletePost (id: string) {
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
