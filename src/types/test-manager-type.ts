import { HTTP_STATUSES } from "../settings"
import { CommentOutput } from "./comment-types"
import { UserOutput } from "./user-types"

type HttpStatusKeys = keyof typeof HTTP_STATUSES

export type HttpStatusType = (typeof HTTP_STATUSES)[HttpStatusKeys]

export class CreatedUserType {
    constructor(
        public user: UserOutput,
        public password: string){}
}

export class CreatedCommentType {
    constructor(
        public comment: CommentOutput | undefined,
        public postId: string,
        public token: string){}
}

export class AuthUserByCredentialsType {
    constructor(
        public accessToken: string,
        public refreshToken: string,
        public user: CreatedUserType){}
}

export class AuthManyDevicesType {
    constructor(
        public user1Device1: AuthUserByCredentialsType | null,
        public user1Device2: AuthUserByCredentialsType | null,
        public user1Device3: AuthUserByCredentialsType | null,
        public user1Device4: AuthUserByCredentialsType | null,
        public user2Device1: AuthUserByCredentialsType | null){}
}

export class CommentLikeInfoModel {
    constructor(
        public likesCount: number,
        public dislikesCount: number,
        public myStatus: string
    ){}
}