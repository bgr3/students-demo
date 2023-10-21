import { WithId } from "mongodb"

export type PostType = {
    title:	string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string | null,
    createdAt: string,
}

export type PostDb = WithId <PostType>

export type PostOutput = PostType & {id: string}

export type PostPostType = {
    title:	string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type PostPutType = {
    title:	string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type PostPutServiceType = {
    title:	string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type PostFilter = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
}

export type PostPaginatorType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostOutput[],
}

export type PostBlogPostType = {
    title:	string,
    shortDescription: string,
    content: string,
}