//import { ObjectId } from "mongodb"

export type BlogType = {
    //_id?: ObjectId,
    id:	string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: 	string,
    isMembership: boolean,
}

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