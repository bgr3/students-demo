import { commentsRepository } from "../repositories/comments-db-repository";
import { postsRepository } from "../repositories/posts-db-repository";
import { CommentOutput, CommentPaginatorType, CommentPostType, CommentPutType, CommentsFilter } from "../types/comment-types";
import { UserDb, UserOutput } from "../types/user-types";

export const commentsService = {
    async testAllData (): Promise<void> {
        return await postsRepository.testAllData()
    },

    async findComments (postId?: string | null, filterService?: CommentsFilter): Promise<CommentPaginatorType> {
        const comments = await commentsRepository.findComments(postId, filterService)

        return comments
    },

    async findCommentById (id: string): Promise<CommentOutput | null> {
        const comment = await commentsRepository.findCommentByID(id);

        return comment

    },

    async createComment (body: CommentPostType, user: UserDb, postId: string): Promise<string | null> {
        
        const post = await postsRepository.findPostByID(postId)
        
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
