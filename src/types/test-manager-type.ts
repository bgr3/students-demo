import { HTTP_STATUSES } from "../settings"
import { CommentOutput } from "./comment-types"
import { UserOutput } from "./user-types"

type HttpStatusKeys = keyof typeof HTTP_STATUSES
export type HttpStatusType = (typeof HTTP_STATUSES)[HttpStatusKeys]

export type CreatedUserType = {
    user: UserOutput | undefined,
    password: string,
}

export type CreatedCommentType = {
    comment: CommentOutput | undefined,
    postId: string,
    token: string,
}