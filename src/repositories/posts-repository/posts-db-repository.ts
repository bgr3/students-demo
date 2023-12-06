import { PostPutServiceType, PostType } from "../../types/post-types";
import { PostModel } from "../../db/db";
import { ObjectId } from "mongodb";
import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
export class PostsRepository {
    async testAllData (): Promise<void> {
        const result = await PostModel.deleteMany({})
        //console.log('post delete: ', result.deletedCount)
    }

    async createPost (newPost: PostType): Promise<string | null> {
        const result = await PostModel.insertMany([newPost]);
        //console.log(result.insertedId)
        
        if (result[0]._id){
            return result[0]._id.toString()
        } else {
            return null
        }
        
    }

    async updatePost (id: string, updatePost: PostPutServiceType): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            const result = await PostModel.updateOne({_id: new ObjectId(id)}, { $set: updatePost})

            if (result.matchedCount) {
                return true
            }

        
        }

        return false
    }

    async myLikeStatus (commentId: string, userId: string): Promise<string|null> {
        if (ObjectId.isValid(commentId)) {            
            const post = await PostModel.findOne({_id: new ObjectId(commentId)})
                        
            if (!post) return null

            for (let elem of post.likesInfo) {
                if (elem.userId === userId) {
                    return elem.likeStatus
                }
            }
        }        

        return null
    }

    async setLikeStatus (commentId: string, userId: string, login: string, likeStatus: string): Promise<boolean> {
        if (ObjectId.isValid(commentId)) {
            const post = await PostModel.findOne({_id: new ObjectId(commentId)})

            if (!post) return false

            const likeStatus = post.likesInfo.filter(i => i.userId === userId)

            const filter = {
                userId: userId,
                login: login,
                addetAt: likeStatus[0] ? likeStatus[0].addedAt : new Date().toISOString(),
                likeStatus: likeStatus
            }
            const resultPull = await PostModel.updateOne({_id: commentId}, {likesInfo: {$pull: filter}})
            const resultPush = await PostModel.updateOne({_id: commentId}, {likesInfo: {$push: filter}})

            if (!resultPush) return false

            return true
        }

        return false
    }
    

    async deletePost (id: string): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            const result = await PostModel.deleteOne({_id: new ObjectId(id)})
        
            if (result.deletedCount) {
                return true
            }
        }
        
        return false
    }
}

