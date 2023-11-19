import mongoose from "mongoose";
import { CommentsCollection } from "../types/comment-types";

export const commentSchema = new mongoose.Schema<CommentsCollection>({
    content: {type: String, required: true},
    commentatorInfo: {
        userId: {type: String, required: true},
        userLogin: {type: String, required: true},
    },
    createdAt: {type: String, required: true},
    postId: {type: String, required: true}
})
