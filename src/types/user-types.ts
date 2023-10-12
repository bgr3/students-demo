import { WithId } from "mongodb"

export type UserType = {
    login: string,
    email: string,
    createdAt: string,
}

export type UserDb = WithId <UserType>

export type UserOutput = UserType & {id:string}

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