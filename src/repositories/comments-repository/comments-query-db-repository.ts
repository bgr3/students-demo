import { CommentModel, commentsCollection } from "../../db/db";
import { ObjectId } from "mongodb";
import { CommentDb, CommentOutput, CommentPaginatorType, CommentsFilter } from "../../types/comment-types";

export const commentFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }

export const commentsQueryRepository = {
    async findComments (postId: string | null = null, filter: CommentsFilter = commentFilter): Promise<CommentPaginatorType> {
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
            items: dbResult.map((p: CommentDb) => commentMapper(p))
        }

        return paginator
    },

    async findCommentByID (id: string): Promise<CommentOutput | null> {
        if (ObjectId.isValid(id)){
            const comment = await CommentModel.findOne({_id: new ObjectId(id)}).lean();
            
            if (comment){
                return commentMapper(comment)
            }
            
            return comment
        }
        
        return null
    },
}

const commentMapper = (comment: CommentDb): CommentOutput => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt,
    }
}