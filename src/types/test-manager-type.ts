import { HTTP_STATUSES } from "../settings"
import { CommentOutput } from "./comment-types"
import { UserOutput } from "./user-types"

type HttpStatusKeys = keyof typeof HTTP_STATUSES
export type HttpStatusType = (typeof HTTP_STATUSES)[HttpStatusKeys]

export type CreatedUserType = {
    user: UserOutput,
    password: string,
}

export type CreatedCommentType = {
    comment: CommentOutput | undefined,
    postId: string,
    token: string,
}

export type AuthUserByCredentialsType = {
    accessToken: string,
    refreshToken: string,
    user: CreatedUserType,
}

export type AuthManyDevicesType = {
    user1Device1: AuthUserByCredentialsType | null,
    user1Device2: AuthUserByCredentialsType | null,
    user1Device3: AuthUserByCredentialsType | null,
    user1Device4: AuthUserByCredentialsType | null,
    user2Device1: AuthUserByCredentialsType | null
}