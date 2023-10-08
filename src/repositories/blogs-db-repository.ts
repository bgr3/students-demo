import { BlogDb, BlogFilter, BlogOutput, BlogPaginatorType, BlogPutType, BlogType } from "../types/blog-types";
import { blogsCollection } from "../db/db";
import { ObjectId } from "mongodb";
import { PostDb } from "../types/post-types";

const blogOptions = {
    projection: {
      _id: 0,
      id:	1,
      name: 1,
      description: 1,
      websiteUrl: 1,
      createdAt: 	1,
      isMembership: 1,
    }
  }

export const blogsRepository = {
    async testAllData (): Promise<void> {
        const result = await blogsCollection.deleteMany({})
        console.log('blogs delete: ', result.deletedCount)
    },

    async findBlogs (filter: BlogFilter): Promise<BlogPaginatorType> {
        const skip = (filter.pageNumber - 1) * filter.pageSize
        const dbCount = await blogsCollection.countDocuments()
        const dbResult = await blogsCollection.find().sort({[filter.sortBy]: (filter.sortDirection == 'asc' ? 1 : -1)}).skip(skip).limit(filter.pageSize).toArray()

        const paginator = {
            pagesCount: Math.ceil(dbCount / filter.pageSize),
            page: filter.pageNumber,
            pageSize: filter.pageSize,
            totalCount: dbCount,
            items: dbResult.map((p: BlogDb) => blogMapper(p))
        }

        return paginator
    },

    async findBlogByID (id: string): Promise<BlogOutput | null> {
        if (ObjectId.isValid(id)) {
            const blog = await blogsCollection.findOne({_id: new ObjectId(id) });
            if (blog) {
                return blogMapper(blog)                
            }
            return blog
        }

        return null
    },

    async createBlog (newblog: BlogType): Promise<string | null> {

        const result = await blogsCollection.insertOne(newblog);
        console.log(result.insertedId)
        if (result.insertedId) {
            return result.insertedId.toString()
        } else {
            return null
        }
    },

    async updateBlog (id: string, updateBlog: BlogPutType): Promise<Boolean> {
        if (ObjectId.isValid(id)) {
            const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, { $set: updateBlog});
        
            if (result.matchedCount) {
                return true
            }
        }

        return false
    },

    async deleteBlog (id: string): Promise<Boolean> {
        if (ObjectId.isValid(id)) {

            const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
            
            if (result.deletedCount) {
                return true
            }
        }
        return false
    }
}

const idValidation = (id: string): ObjectId => {
    return ObjectId.isValid(id) ? new ObjectId(id) : new ObjectId ('123456789012')
}


const blogMapper = (blog: BlogDb): BlogOutput => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: 	blog.createdAt,
        isMembership: blog.isMembership,
    }
}