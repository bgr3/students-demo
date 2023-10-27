import { commentsCollection } from "../db/db";
import { ObjectId } from "mongodb";
import { CommentDb, CommentOutput, CommentPaginatorType, CommentPostType, CommentPutType, CommentType, CommentsCollection, CommentsFilter } from "../types/comment-types";

export const commentFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }

export const commentsRepository = {
    async testAllData (): Promise<void> {
        const result = await commentsCollection.deleteMany({})
        //console.log('comments delete: ', result.deletedCount)
    },

    async findComments (postId: string | null = null, filter: CommentsFilter = commentFilter): Promise<CommentPaginatorType> {
        let find:any = {}
        
        if (postId){
            find.postId = postId;
        }

        const skip = (filter.pageNumber - 1) * filter.pageSize

        const dbCount = await commentsCollection.countDocuments(find)
        const dbResult = await commentsCollection.find(find).sort({[filter.sortBy]: (filter.sortDirection == 'asc' ? 1 : -1)}).skip(skip).limit(filter.pageSize).toArray()
        
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
            const comment = await commentsCollection.findOne({_id: new ObjectId(id)});
            
            if (comment){
                return commentMapper(comment)
            }
            
            return comment
        }
        
        return null
    },

    async createComment (newComment: CommentsCollection): Promise<string | null> {
        const result = await commentsCollection.insertOne(newComment);
        //console.log(result.insertedId)
        
        if (result.insertedId){
            return result.insertedId.toString()
        } else {
            return null
        }
        
    },

    async updateComment (id: string, updateComment: CommentPutType): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            const result = await commentsCollection.updateOne({_id: new ObjectId(id)}, { $set: updateComment})

            if (result.matchedCount) {
                return true
            }

        
        }

        return false
    },

    async deleteComment (id: string): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            const result = await commentsCollection.deleteOne({_id: new ObjectId(id)})
        
            if (result.deletedCount) {
                return true
            }
        }
        
        return false
    }
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