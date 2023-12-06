import { LikesInfo, LikesInfoOutput, PostDb, PostFilterType, PostOutput, PostPaginatorType } from "../../types/post-types";
import { PostModel } from "../../db/db";
import { ObjectId } from "mongodb";
import "reflect-metadata";
import { injectable } from "inversify";

export const postFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
}

@injectable()
export class PostsQueryRepository {
    async findPosts (blogId: string | null = null, filter: PostFilterType = postFilter, userId: string = ''): Promise<PostPaginatorType> {
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
            items: dbResult.map((p: PostDb) => postMapper(p, userId))
        }
    
        return paginator
    }
    
    async findPostByID (id: string, userId: string = ''): Promise<PostOutput | null> {
        if (ObjectId.isValid(id)){
            const post = await PostModel.findOne({_id: new ObjectId(id)}).lean();
            
            if (post){
                return postMapper(post, userId)
            }
            
            return post
        }
        
        return null
    }
}
  
const postMapper = (post: PostDb, userId: string): PostOutput => {
    const myStatus = post.likesInfo.filter(i => i.userId === userId)
    const lastLikes = post.likesInfo.sort((a, b) => a.addedAt < b.addedAt ? 1 : -1)
    const likesCount = post.likesInfo.filter(i => i.likeStatus === 'Like').length
    const dislikesCount = post.likesInfo.filter(i => i.likeStatus === 'Dislike').length

    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
        extendedLikesInfo: {
            likesCount: likesCount,
            dislikesCount: dislikesCount,
            myStatus: myStatus[0] ? myStatus[0].likeStatus : 'None',
            newestLikes: lastLikes.slice(0, 3).map(i => likesMapper(i))
        }
    }
}

const likesMapper = (like:LikesInfo): LikesInfoOutput => {
    return {
        userId: like.userId,
        login: like.login,
        addedAt: like.addedAt
    }
}