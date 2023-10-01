export type PostType = {
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