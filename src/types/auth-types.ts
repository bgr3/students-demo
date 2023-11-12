import { WithId } from "mongodb"
import { type } from "os"

export type Tokens = {
    accessToken: string,
    refreshToken: string,
}

export type DbTokens = WithId <Tokens>

export type AuthType = {
    issuedAt: Date,
    expiredAt: Date,
    deviceId: string,
    deviceIP: string,
    deviceName: string,
    userId: string,
    tokens: {
        accessToken: string,
        refreshToken: string,
    }
}

export type DbAuthType = WithId <AuthType>

export type AuthTypeOutput = {    
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string
}

export type AuthPutType = {
    issuedAt: Date,
    expiredAt: Date,
    tokens: {
        accessToken: string,
        refreshToken: string,
    }
}

export type MeType = {
    "email": string,
    "login": string,
    "userId": string
  } 

export type LoginResponseType = {
    accessToken: string
}

