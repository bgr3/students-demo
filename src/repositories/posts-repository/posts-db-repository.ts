import { PostPutServiceType, PostType } from "../../types/post-types";
import { PostModel } from "../../db/db";
import { ObjectId } from "mongodb";

export const postsRepository = {
    async testAllData (): Promise<void> {
        const result = await PostModel.deleteMany({})
        //console.log('post delete: ', result.deletedCount)
    },

    async createPost (newPost: PostType): Promise<string | null> {
        const result = await PostModel.insertMany([newPost]);
        //console.log(result.insertedId)
        
        if (result[0]._id){
            return result[0]._id.toString()
        } else {
            return null
        }
        
    },

    async updatePost (id: string, updatePost: PostPutServiceType): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            const result = await PostModel.updateOne({_id: new ObjectId(id)}, { $set: updatePost})

            if (result.matchedCount) {
                return true
            }

        
        }

        return false
    },

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

