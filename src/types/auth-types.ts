import { WithId } from "mongodb"

export type Tokens = {
    accessToken: string,
    refreshToken: string,
}

export type DbTokens = WithId <Tokens>


