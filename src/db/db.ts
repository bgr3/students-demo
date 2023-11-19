import { MongoClient } from "mongodb"
import { BlogType } from "../types/blog-types";
import dotenv from "dotenv"
import { PostType } from "../types/post-types";
import { UserType } from "../types/user-types";
import { CommentsCollection } from "../types/comment-types";
import { AccessLogType } from "../types/access-log-types";
import { AuthType } from "../types/auth-types";
import mongoose from "mongoose";
import { userSchema } from "../schemas/user-schema";
import { blogSchema } from "../schemas/blog-schema";
import { postSchema } from "../schemas/post-schema";
import { commentSchema } from "../schemas/comment-schema";
import { accessLogSchema } from "../schemas/access-log-schema";
import { authSchema } from "../schemas/auth-schema";

dotenv.config()

const url = process.env.MONGO_URL;
const dbName = 'mongoose-homework'

if (!url) {
    throw new Error('! URL doesn`t found')
}

/*
export const client = new MongoClient(url);

export const db = client.db('test')
export const blogsCollection = db.collection<BlogType>('blogs')
export const postsCollection = db.collection<PostType>('posts')
export const usersCollection = db.collection<UserType>('users')
export const commentsCollection = db.collection<CommentsCollection>('comments')
export const accessLogCollection = db.collection<AccessLogType>('accessLog')
export const authCollection = db.collection<AuthType>('auth')
*/


export const BlogModel = mongoose.model('blogs', blogSchema)
export const PostModel = mongoose.model('posts', postSchema)
export const UserModel = mongoose.model('users', userSchema)
export const CommentModel = mongoose.model('comments', commentSchema)
export const AccessLogModel = mongoose.model('accessLog', accessLogSchema)
export const AuthModel = mongoose.model('auth', authSchema)


export const runDb = async () => {
    try {
        /*await client.connect();*/
        await mongoose.connect(url + '/' + dbName)
        console.log('Connect successfully to server');
    } catch (e) {
        console.log('! Don`t connect successfully to server')
        /*await client.close()*/
        await mongoose.disconnect()
    }
};

