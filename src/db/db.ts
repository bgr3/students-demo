import { MongoClient } from "mongodb"
import { BlogDb } from "../types/blog-types";
import { PostDb } from "../types/post-types";
import dotenv from "dotenv"
import { UserDb } from "../types/user-types";

dotenv.config()

const url = process.env.MONGO_URL;

if (!url) {
    throw new Error('! URL doesn`t found')
}

export const client = new MongoClient(url);

export const db = client.db('test')
export const blogsCollection = db.collection<BlogDb>('blogs')
export const postsCollection = db.collection<PostDb>('posts')
export const usersCollection = db.collection<UserDb>('users')

export const runDb = async () => {
    try {
        await client.connect();
        console.log('Connect successfully to server');
    } catch (e) {
        console.log('! Don`t connect successfully to server')
        await client.close()
    }
};

