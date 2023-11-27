import { CommentsRepository } from "../repositories/comments-repository/comments-db-repository";
import { PostsRepository } from "../repositories/posts-repository/posts-db-repository";
import { PostsQueryRepository } from "../repositories/posts-repository/posts-query-db-repository";
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

export class CommentsService {
    constructor(
        protected commentsRepository: CommentsRepository,
        protected postsRepository: PostsRepository,
        protected postsQueryRepository: PostsQueryRepository){}
    async testAllData (): Promise<void> {
        return await this.postsRepository.testAllData()
    }

    async createComment (body: CommentPostType, token: string, postId: string): Promise</*Result<string | null>*/string | null> {
        const user = await getUserByJWTAccessToken(token)

        if (!user) return null
        // {
        // data: null,
        // errorMessage: 'user not found',
        // statusCode: StatusCode.BadRequest
        // }
        
        const post = await this.postsQueryRepository.findPostByID(postId)
        
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
        
            const result = await this.commentsRepository.createComment(newComment);
        
            return result
        }

        return null  

    }

    async updateComment (id: string, body: CommentPutType): Promise<boolean> {
       const updateComment = {             
            content: body.content
        }

        return this.commentsRepository.updateComment(id, updateComment)
    }

    async deleteComment (id: string): Promise<boolean> {
        return this.commentsRepository.deleteComment(id)
    }
}

