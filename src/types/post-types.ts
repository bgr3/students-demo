import { ObjectId } from "mongodb"

export class PostType {
    constructor(
        public title:	string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string | null,
        public createdAt: string,
        public likesInfo: LikesInfo[]){}
}

export class PostDb extends PostType {
    constructor(
        public _id: ObjectId,
        title:	string,
        shortDescription: string,
        content: string,
        blogId: string,
        blogName: string | null,
        createdAt: string,
        likesInfo: LikesInfo[]){
            super(title, shortDescription, content, blogId, blogName, createdAt, likesInfo)
        }
}

export class PostOutput {
    constructor(
        public id: string,
        public title:	string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string | null,
        public createdAt: string,
        public extendedLikesInfo: {
            likesCount: number,
            dislikesCount: number,
            myStatus: string,
            newestLikes: LikesInfoOutput[]}){}
}

export class PostPostType {
    constructor(
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string){}
}

export class PostPutType {
    constructor(
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,){}
}

export class PostPutServiceType {
    constructor(
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string){}
}

export class PostFilterType {
    constructor(
        public pageNumber: number,
        public pageSize: number,
        public sortBy: string,
        public sortDirection: string){}
}

export class PostPaginatorType {
    constructor(
        public pagesCount: number,
        public page: number,
        public pageSize: number,
        public totalCount: number,
        public items: PostOutput[]){}
}

export class PostBlogPostType {
    constructor(
        public title: string,
        public shortDescription: string,
        public content: string){}
}

export class PostLikeStatus {
    constructor(
        public likeStatus: string
    ){}
}

export class LikesInfo {
    constructor(
        public userId: string,
        public login: string,
        public addedAt: string,
        public likeStatus: string
    ){}
}

export class LikesInfoOutput {
    constructor(
        public userId: string,
        public login: string,
        public addedAt: string,
    ){}
}