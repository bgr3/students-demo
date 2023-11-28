export class JWTRefreshTokenType {
    constructor(
        public token: string,
        public  tokenTiming: {
            issueAt: Date,
            expirationTime: Date,
        }){}
}