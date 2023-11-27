import { ObjectId } from "mongodb"

import { WithId } from "mongodb"

export class BlogType {
    constructor(
        public name: string,
        public description: string,
        public websiteUrl: string,
        public createdAt: 	string,
        public isMembership: boolean){}
}
export class BlogDb extends BlogType {
    constructor(
        public _id: ObjectId,
        public name: string,
        public description: string,
        public websiteUrl: string,
        public createdAt: 	string,
        public isMembership: boolean){
            super(name, description, websiteUrl, createdAt, isMembership)
        }
}

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
    searchNameTerm: string,
}

export type BlogPaginatorType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogOutput[],
}