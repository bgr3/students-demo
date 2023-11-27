import { PostDb, PostFilterType, PostOutput, PostPaginatorType } from "../../types/post-types";
import { PostModel } from "../../db/db";
import { ObjectId } from "mongodb";

export const postFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
}

export class PostsQueryRepository {
    async findPosts (blogId: string | null = null, filter: PostFilterType = postFilter): Promise<PostPaginatorType> {
        let find:any = {}
        
        if (blogId){
            find.blogId = blogId;
        }
    
        const skip = (filter.pageNumber - 1) * filter.pageSize
    
        const dbCount = await PostModel.countDocuments(find)
        const dbResult = await PostModel.find(find).sort({[filter.sortBy]: (filter.sortDirection == 'asc' ? 1 : -1)}).skip(skip).limit(filter.pageSize).lean()
        
        const paginator = {
            pagesCount: Math.ceil(dbCount / filter.pageSize),
            page: filter.pageNumber,
            pageSize: filter.pageSize,
            totalCount: dbCount,
            items: dbResult.map((p: PostDb) => postMapper(p))
        }
    
        return paginator
    }
    
    async findPostByID (id: string): Promise<PostOutput | null> {
        if (ObjectId.isValid(id)){
            const post = await PostModel.findOne({_id: new ObjectId(id)}).lean();
            
            if (post){
                return postMapper(post)
            }
            
            return post
        }
        
        return null
    }
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