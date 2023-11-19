import mongoose from "mongoose";
import { BlogType } from "../types/blog-types";


export const blogSchema = new mongoose.Schema<BlogType>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    createdAt: {type: String, required: true},
    isMembership: {type: Boolean, required: true},
})
