import { MongoClient, ObjectId } from "mongodb"
import { BlogType } from "../types/blog-types";
import { PostType } from "../types/post-types";
import dotenv from "dotenv"

dotenv.config()

const url = process.env.MONGO_URL;

if (!url) {
    throw new Error('! URL doesn`t found')
}

export const client = new MongoClient(url);

export const db = client.db('test')
export const blogsCollection = db.collection<BlogType>('blogs')
export const postsCollection = db.collection<PostType>('posts')

export const runDb = async () => {
    try {
        await client.connect();
        console.log('Connect successfully to server');
    } catch (e) {
        console.log('! Don`t connect successfully to server')
        await client.close()
    }
};

