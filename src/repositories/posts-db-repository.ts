import { PostDb, PostFilter, PostOutput, PostPaginatorType, PostPutServiceType, PostType } from "../types/post-types";
import { postsCollection } from "../db/db";
import { ObjectId } from "mongodb";

const postOptions = {
    projection: {
        _id: 0,
        id:	1,
        title:	1,
        shortDescription: 1,
        content: 1,
        blogId: 1,
        blogName: 1,
        createdAt: 1,
    }
  }

export const postsRepository = {
    async testAllData (): Promise<void> {
        const result = await postsCollection.deleteMany({})
        console.log('post delete: ', result.deletedCount)
    },

    async findPosts (blogId: string | null, filter: PostFilter): Promise<PostPaginatorType> {
        let find:any = {}
        
        if (blogId){
            find.blogId = blogId;
        }

        const skip = (filter.pageNumber - 1) * filter.pageSize

        const dbCount = await postsCollection.countDocuments(find)
        const dbResult = await postsCollection.find(find).sort({[filter.sortBy]: (filter.sortDirection == 'asc' ? 1 : -1)}).skip(skip).limit(filter.pageSize).toArray()

        const paginator = {
            pagesCount: Math.ceil(dbCount / filter.pageSize),
            page: filter.pageNumber,
            pageSize: filter.pageSize,
            totalCount: dbCount,
            items: dbResult.map((p: PostDb) => postMapper(p))
        }

        return paginator
    },

    async findPostByID (id: string): Promise<PostOutput | null> {
        if (ObjectId.isValid(id)){
            const post = await postsCollection.findOne({_id: new ObjectId(id)});
            
            if (post){
                return postMapper(post)
            }
            
            return post
        }
        
        return null
    },

    async createPost (newPost: PostType): Promise<string | null> {
        const result = await postsCollection.insertOne(newPost);
        console.log(result.insertedId)
        
        if (result.insertedId){
            return result.insertedId.toString()
        } else {
            return null
        }
        
    },

    async updatePost (id: string, updatePost: PostPutServiceType): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            const result = await postsCollection.updateOne({_id: new ObjectId(id)}, { $set: updatePost})

            if (result.matchedCount) {
                return true
            }

        
        }

        return false
    },

    async deletePost (id: string): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        
            if (result.deletedCount) {
                return true
            }
        }
        
        return false
    }
}

function findBlogById(arg0: string) {
    throw new Error("Function not implemented.");
}

const postMapper = (post: PostDb): PostOutput => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
    }
}