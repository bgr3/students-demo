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

export class BlogOutput extends BlogType {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public websiteUrl: string,
        public createdAt: 	string,
        public isMembership: boolean){
            super(name, description, websiteUrl, createdAt, isMembership)
        }
}

export class BlogPostType {
    constructor(
        public name: string,
        public description: string,
        public websiteUrl: string){}
}

export class BlogPutType {
    constructor(
        public name: string,
        public description: string,
        public websiteUrl: string){}
}

export class BlogFilter {
    constructor(
        public pageNumber: number,
        public pageSize: number,
        public sortBy: string,
        public sortDirection: string,
        public searchNameTerm: string){}
}

export class BlogPaginatorType {
    constructor(
        public pagesCount: number,
        public page: number,
        public pageSize: number,
        public totalCount: number,
        public  items: BlogOutput[]){}
}