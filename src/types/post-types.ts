import { ObjectId } from "mongodb"

export type PostType = {
    _id?: ObjectId,
    id:	string,
    title:	string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string | null,
    createdAt: string,
}

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