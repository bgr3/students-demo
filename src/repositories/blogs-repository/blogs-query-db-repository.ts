import { BlogDb, BlogFilter, BlogOutput, BlogPaginatorType } from "../../types/blog-types";
import { BlogModel } from "../../db/db";
import { ObjectId } from "mongodb";

export const blogFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
    searchNameTerm: '',
  }

  export const blogsQueryRepository = {
    async findBlogs (filter: BlogFilter = blogFilter): Promise<BlogPaginatorType> {
        const skip = (filter.pageNumber - 1) * filter.pageSize
        const regex = new RegExp(filter.searchNameTerm, 'i')
        const dbCount = await BlogModel.countDocuments({name: RegExp(regex)})
        const dbResult = await BlogModel.find({name: RegExp(regex)}).sort({[filter.sortBy]: (filter.sortDirection == 'asc' ? 1 : -1)}).skip(skip).limit(filter.pageSize).lean()

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
            const blog = await BlogModel.findOne({_id: new ObjectId(id) }).lean();
            
            if (blog) {
                return blogMapper(blog)                
            }
            return blog
        }

        return null
    },
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