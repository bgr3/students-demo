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

    async myLikeStatus (commentId: string, userId: string): Promise<string|null> {
        if (ObjectId.isValid(commentId)) {            
            const comment = await CommentModel.findOne({_id: new ObjectId(commentId)}).lean()
            
            
            if (!comment) return null

            let myStatus = null            

            if (comment.likesInfo.likes.includes(userId)) {
                myStatus = 'Like'
            } else if (comment.likesInfo.dislikes.includes(userId)) {
                myStatus = 'Dislike'
            } else {
                myStatus = 'None'
            }            

            return myStatus
        }        

        return null
    }

    async setLikeStatus (commentId: string, userId: string, oldStatus: string, newStatus: string): Promise<boolean> {
        const filter = (status: string, userId: string) => {
            if (status === 'Like') {
                return {'likesInfo.likes': userId}
            } else if (status === 'Dislike') {
                return {'likesInfo.dislikes': userId}
            } else {
                return {}
            }
        }

        const oldStatusFilter = filter(oldStatus, userId)
        const newStatusFilter = filter(newStatus, userId)       
        
        if (ObjectId.isValid(commentId)) {
            const resultPull = await CommentModel.updateOne({_id: commentId}, {$pull: oldStatusFilter})
            const resultPush = await CommentModel.updateOne({_id: commentId}, {$push: newStatusFilter})

            if (!resultPush) return false

            return true
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


