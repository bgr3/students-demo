export type JWTRefreshTokenType = {
    token: string,
    tokenTiming: {
        issueAt: Date,
        expirationTime: Date,
    }
}