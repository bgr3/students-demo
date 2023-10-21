import { WithId } from "mongodb"

export type CommentType = {
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    createdAt: string
}

export type CommentsCollection = CommentType & {postId: string}

export type CommentDb = WithId <CommentsCollection> 

export type CommentOutput = CommentType & {id: string}

export type CommentPostType = {
    postId: string
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    createdAt: string
}

export type CommentPutType = {
    content: string
}

export type CommentsFilter = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
}

export type CommentPaginatorType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: CommentOutput[],
}
