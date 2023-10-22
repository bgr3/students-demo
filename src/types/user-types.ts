import { WithId } from "mongodb"

export type UserType = {
    login: string,
    email: string,
    password: string
    createdAt: string,
}

export type UserDb = WithId <UserType>

export type UserOutput = {
    id:string,
    login: string,
    email: string,
    createdAt: string,
}

export type UserPostType = {
    login: string,
    password: string,
    email: string,
}

export type UserFilter = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    searchLoginTerm: string,
    searchEmailTerm: string,
}

export type UserPaginatorType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserOutput[],
}

export type UserMe = {
    email: string,
    login: string,
    userId: string,
}