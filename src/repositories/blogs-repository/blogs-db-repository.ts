import { BlogPutType, BlogType } from "../../types/blog-types";
import { BlogModel } from "../../db/db";
import { ObjectId } from "mongodb";

export const blogFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
    searchNameTerm: '',
  }

export class BlogsRepository {
    async testAllData (): Promise<void> {
        const result = await BlogModel.deleteMany({})
        //console.log('blogs delete: ', result.deletedCount)
    }

    async createBlog (newBlog: BlogType): Promise<string | null> {
        const result = await BlogModel.insertMany([newBlog]);
        //console.log(result.insertedId)
        if (result[0]._id) {
            return result[0]._id.toString()
        } else {
            return null
        }
    }

    async updateBlog (id: string, updateBlog: BlogPutType): Promise<Boolean> {
        if (ObjectId.isValid(id)) {
            const result = await BlogModel.updateOne({_id: new ObjectId(id)}, { $set: updateBlog});
        
            if (result.matchedCount) {
                return true
            }
        }

        return false
    }

    async deleteBlog (id: string): Promise<Boolean> {
        if (ObjectId.isValid(id)) {

            const result = await BlogModel.deleteOne({_id: new ObjectId(id)})
            
            if (result.deletedCount) {
                return true
            }
        }
        return false
    }
}


// const idValidation = (id: string): ObjectId => {
//     return ObjectId.isValid(id) ? new ObjectId(id) : new ObjectId ('123456789012')
// }


