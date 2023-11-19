import { commentsRepository } from "../repositories/comments-repository/comments-db-repository";
import { postsRepository } from "../repositories/posts-repository/posts-db-repository";
import { postsQueryRepository } from "../repositories/posts-repository/posts-query-db-repository";
import { CommentPostType, CommentPutType } from "../types/comment-types";
import { getUserByJWTAccessToken } from "../validation/authorization-validation";
enum  StatusCode {
    Success = 0,
    BadRequest = 1,
    Forbidden = 2,
} 

type Result<T> = {
    statusCode: StatusCode
    errorMessage?: string
    data: T
}

export const commentsService = {
    async testAllData (): Promise<void> {
        return await postsRepository.testAllData()
    },

    async createComment (body: CommentPostType, token: string, postId: string): Promise</*Result<string | null>*/string | null> {
        const user = await getUserByJWTAccessToken(token)

        if (!user) return null
        // {
        // data: null,
        // errorMessage: 'user not found',
        // statusCode: StatusCode.BadRequest
        // }
        
        const post = await postsQueryRepository.findPostByID(postId)
        
        if (post){
            const newComment = {    
                postId: post.id,
                content: body.content,
                commentatorInfo: {
                    userId: user._id.toString(),
                    userLogin: user.login
            },
            createdAt: new Date().toISOString(),
            };
        
            const result = await commentsRepository.createComment(newComment);
        
            return result
        }

        return null  

    },

    async updateComment (id: string, body: CommentPutType): Promise<boolean> {
       const updateComment = {             
            content: body.content
        }

        return commentsRepository.updateComment(id, updateComment)
    },

    async deleteComment (id: string): Promise<boolean> {
        return commentsRepository.deleteComment(id)
    }
}
