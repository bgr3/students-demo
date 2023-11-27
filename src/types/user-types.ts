import { ObjectId} from "mongodb"
import { Tokens } from "./auth-types"

export class UserType {
    constructor(public login: string,
                public email: string,
                public password: string,
                public createdAt: string,
                public emailConfirmation : {
                    confirmationCode: string,
                    expirationDate: object,
                    isConfirmed: boolean,
                    nextSend: object
                },
                public JWTTokens: Tokens[]){}
}

export class UserDb extends UserType{
    constructor(public _id: ObjectId, 
                public login: string,
                public email: string,
                public password: string,
                public createdAt: string,
                public emailConfirmation : {
                    confirmationCode: string,
                    expirationDate: object,
                    isConfirmed: boolean,
                    nextSend: object
                },
                public JWTTokens: Tokens[]){
        super(login, email, password, createdAt, emailConfirmation, JWTTokens)
    }
}

export class UserOutput {
    constructor(public id: string,
                public login: string,
                public email: string,
                public createdAt: string,){}
}

export class UserPostType {
    constructor(public login: string,
                public password: string,
                public email: string){}
}

export class UserFilterType {
    constructor(public pageNumber: number,
                public pageSize: number,
                public sortBy: string,
                public sortDirection: string,
                public searchLoginTerm: string,
                public searchEmailTerm: string){}
}

export class UserPaginatorType {
    constructor(public pagesCount: number,
                public page: number,
                public pageSize: number,
                public totalCount: number,
                public items: UserOutput[]){}
}

export class UserMe {
    constructor(public email: string,
                public login: string,
                public userId: string){}
}