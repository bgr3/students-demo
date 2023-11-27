import { ObjectId } from "mongodb"

export class Tokens {
    constructor(public accessToken: string,
                public refreshToken: string){}
}

export class DbTokens extends Tokens {
    constructor(public _id: ObjectId,
                public accessToken: string,
                public refreshToken: string){
                    super(accessToken, refreshToken)
                }
}

export class AuthType {
    constructor(public issuedAt: Date,
                public expiredAt: Date,
                public deviceId: string,
                public deviceIP: string,
                public deviceName: string,
                public userId: string,
                public tokens: {
                    accessToken: string,
                    refreshToken: string,
                }){}
}

export class DbAuthType extends AuthType {
    constructor(public _id: ObjectId,
                public issuedAt: Date,
                public expiredAt: Date,
                public deviceId: string,
                public deviceIP: string,
                public deviceName: string,
                public userId: string,
                public tokens: {
                    accessToken: string,
                    refreshToken: string,
                }){
                    super(issuedAt, expiredAt, deviceId, deviceIP, deviceName, userId, tokens)
                }
}

export class AuthTypeOutput {    
    constructor(public ip: string,
                public title: string,
                public lastActiveDate: string,
                public deviceId: string){}
}

export class AuthPutType {
    constructor(public issuedAt: Date,
                public expiredAt: Date,
                public tokens: {
                accessToken: string,
                refreshToken: string,
                }){}
}

export class MeType {
    constructor(public email: string,
                public login: string,
                public userId: string){}
  } 

export class LoginResponseType {
    constructor(public accessToken: string){}
}

