import { MongoClient } from "mongodb"
import { BlogType } from "../types/blog-types";
import dotenv from "dotenv"
import { PostType } from "../types/post-types";
import { UserType } from "../types/user-types";
import { CommentsCollection } from "../types/comment-types";

dotenv.config()

const url = process.env.MONGO_URL;

if (!url) {
    throw new Error('! URL doesn`t found')
}

export const client = new MongoClient(url);

export const db = client.db('test')
export const blogsCollection = db.collection<BlogType>('blogs')
export const postsCollection = db.collection<PostType>('posts')
export const usersCollection = db.collection<UserType>('users')
export const commentsCollection = db.collection<CommentsCollection>('comments')

export const runDb = async () => {
    try {
        await client.connect();
        console.log('Connect successfully to server');
    } catch (e) {
        console.log('! Don`t connect successfully to server')
        await client.close()
    }
};

