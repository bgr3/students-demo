import { CommentModel } from "../../db/db";
import { ObjectId } from "mongodb";
import { CommentPutType, CommentsCollection } from "../../types/comment-types";

export class CommentsRepository {
    async testAllData (): Promise<void> {
        const result = await CommentModel.deleteMany({})
        //console.log('comments delete: ', result.deletedCount)
    }

    async createComment (newComment: CommentsCollection): Promise<string | null> {
        const result = await CommentModel.insertMany([newComment]);
        //console.log(result.insertedId)
        
        if (result[0]._id){
            return result[0]._id.toString()
        } else {
            return null
        }
        
    }

    async updateComment (id: string, updateComment: CommentPutType): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            const result = await CommentModel.updateOne({_id: new ObjectId(id)}, { $set: updateComment})

            if (result.matchedCount) {
                return true
            }

        
        }

        return false
    }

    async deleteComment (id: string): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            const result = await CommentModel.deleteOne({_id: new ObjectId(id)})
        
            if (result.deletedCount) {
                return true
            }
        }
        
        return false
    }
}


