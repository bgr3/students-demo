import mongoose from "mongoose";
import { PostType } from "../types/post-types";

export const postSchema = new mongoose.Schema<PostType>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: String, required: true},
    blogName: {type: String || null, required: true},
    createdAt: {type: String, required: true},
})
