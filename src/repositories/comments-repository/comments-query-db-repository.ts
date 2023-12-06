import { CommentModel } from "../../db/db";
import { ObjectId } from "mongodb";
import { CommentDb, CommentOutput, CommentPaginatorType, CommentsFilter } from "../../types/comment-types";
import { injectable } from "inversify";
import "reflect-metadata";

export const commentFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
}

@injectable()
export class CommentsQueryRepository {
    async findComments (postId: string | null = null, filter: CommentsFilter = commentFilter, userId: string = ''): Promise<CommentPaginatorType> {
        let find:any = {}
        
        if (postId){
            find.postId = postId;
        }

        const skip = (filter.pageNumber - 1) * filter.pageSize

        const dbCount = await CommentModel.countDocuments(find)
        const dbResult = await CommentModel.find(find).sort({[filter.sortBy]: (filter.sortDirection == 'asc' ? 1 : -1)}).skip(skip).limit(filter.pageSize).lean()

        const paginator = {
            pagesCount: Math.ceil(dbCount / filter.pageSize),
            page: filter.pageNumber,
            pageSize: filter.pageSize,
            totalCount: dbCount,
            items: dbResult.map((p: CommentDb) => commentMapper(p, userId))
        }

        return paginator
    }

    async findCommentByID (id: string, userId: string = ''): Promise<CommentOutput | null> {
        if (ObjectId.isValid(id)){
            const comment = await CommentModel.findOne({_id: new ObjectId(id)}).lean();

            if (comment){
                return commentMapper(comment, userId)
            }
            
            return comment
        }
        
        return null
    }
}

const commentMapper = (comment: CommentDb, userId: string): CommentOutput => {
    let myStatus: string
    if (comment.likesInfo.likes.includes(userId)) {
        myStatus = 'Like'
    } else if (comment.likesInfo.dislikes.includes(userId)) {
        myStatus = 'Dislike'
    } else {
        myStatus = 'None'
    }    

    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt,
        likesInfo: {
            likesCount: comment.likesInfo.likes.length,
            dislikesCount: comment.likesInfo.dislikes.length,
            myStatus: myStatus 
        }
    }
}