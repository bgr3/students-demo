//import { ObjectId } from "mongodb"

import { WithId } from "mongodb"

export type BlogType = {
    //_id?: ObjectId,
    //id:	string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: 	string,
    isMembership: boolean,
}
export type BlogDb = WithId <BlogType>

export type BlogOutput = BlogType & {id: string}

export type BlogPostType = {
    name: string,
    description: string,
    websiteUrl: string,
}

export type BlogPutType = {
    name: string,
    description: string,
    websiteUrl: string,
}

export type BlogFilter = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
}

export type BlogPaginatorType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogOutput[],
}