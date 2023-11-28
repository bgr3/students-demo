import { ObjectId } from "mongodb"

export class PostType {
    constructor(
        public title:	string,
        public shortDescription: string,
        public content: string,
        public  blogId: string,
        public  blogName: string | null,
        public   createdAt: string){}
}

export class PostDb extends PostType {
    constructor(
        public _id: ObjectId,
        title:	string,
        shortDescription: string,
        content: string,
        blogId: string,
        blogName: string | null,
        createdAt: string){
            super(title, shortDescription, content, blogId, blogName, createdAt)
        }
}

export class PostOutput extends PostType {
    constructor(
        public id: string,
        title:	string,
        shortDescription: string,
        content: string,
        blogId: string,
        blogName: string | null,
        createdAt: string){
            super(title, shortDescription, content, blogId, blogName, createdAt)
        }
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