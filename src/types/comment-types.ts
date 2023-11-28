import { ObjectId } from "mongodb"

export class CommentType {
    constructor(
        public content: string,
        public commentatorInfo: {
            userId: string,
            userLogin: string
        },
        public createdAt: string,
        public likesInfo: {
            likes: string[],
            dislikes: string[]
        }){}
}

export class CommentsCollection extends CommentType {
    constructor(
        public postId: string,
        content: string,
        commentatorInfo: {
            userId: string,
            userLogin: string
        },
        createdAt: string,
        likesInfo: {
            likes: string[],
            dislikes: string[]
        }){
            super(content, commentatorInfo, createdAt, likesInfo)
        }
}

export class CommentDb extends CommentsCollection {
    constructor(
        public _id: ObjectId,
        postId: string,
        content: string,
        commentatorInfo: {
            userId: string,
            userLogin: string
        },
        createdAt: string,
        likesInfo: {
            likes: string[],
            dislikes: string[]
        }){
            super(postId, content, commentatorInfo, createdAt, likesInfo)
        }
}

export class CommentOutput {
    constructor(
        public id: string,
        public content: string,
        public commentatorInfo: {
            userId: string,
            userLogin: string
        },
        public createdAt: string,
        public likesInfo: {
            likesCount: string,
            dislikesCount: string,
            myStatus: string
        }){}
}

export class CommentPostType {
    constructor(
        public content: string){}
}

export class CommentPutType {
    constructor(
        public content: string){}
}

export class CommentsFilter {
    constructor(
        public pageNumber: number,
        public pageSize: number,
        public sortBy: string,
        public sortDirection: string,){}
}

export class CommentPaginatorType {
    constructor(
        public pagesCount: number,
        public page: number,
        public pageSize: number,
        public totalCount: number,
        public items: CommentOutput[]){}
}

export class LikeStatus {
    constructor(
        public likeStatus: string
    ){}
}
