import { CommentsRepository } from "../repositories/comments-repository/comments-db-repository";
import { PostsRepository } from "../repositories/posts-repository/posts-db-repository";
import { PostsQueryRepository } from "../repositories/posts-repository/posts-query-db-repository";
import { CommentPostType, CommentPutType, CommentsCollection, LikeStatus } from "../types/comment-types";
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
        return await this.commentsRepository.testAllData()
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
            const newComment = new CommentsCollection(
                post.id, 
                body.content, 
                {
                    userId: user._id.toString(),
                    userLogin: user.login
                },
                new Date().toISOString(),
                {
                    likes: [],
                    dislikes: []
                }
            );
        
            const result = await this.commentsRepository.createComment(newComment);
        
            return result
        }

        return null  

    }

    async updateComment (id: string, body: CommentPutType): Promise<boolean> {
        const updateComment = new CommentPutType(
            body.content
        )             

        return await this.commentsRepository.updateComment(id, updateComment)
    }

    async likeStatus (commentId: string, accessToken: string, body: LikeStatus): Promise <boolean> {
        const user = await getUserByJWTAccessToken(accessToken)
        const userId = user!._id.toString()
        const likeStatus = body.likeStatus
        const myLikeStatus = await this.commentsRepository.myLikeStatus(commentId, userId)

        if (!myLikeStatus) return false

        console.log(likeStatus, myLikeStatus);
        
        

        if (likeStatus !== myLikeStatus) {
            return await this.commentsRepository.setLikeStatus(commentId, userId, myLikeStatus, likeStatus)
        }

        return true
    }

    async deleteComment (id: string): Promise<boolean> {
        return await this.commentsRepository.deleteComment(id)
    }
}

