import { WithId } from "mongodb"

export type Tokens = {
    acsessToken: string,
    refreshToken: string,
}

export type DbTokens = WithId <Tokens>


