import { settings } from "../settings";
import jwt from 'jsonwebtoken'
import add from 'date-fns/add'
import { JWTRefreshTokenType } from "../types/JWT-types";

export const jwtService = {
    async createJWT (userId: string, expirationTimeSeconds: number = 300) {
        const token = jwt.sign({userId: userId}, settings.JWT_SECRET, {expiresIn: `${expirationTimeSeconds}s`})
        return token
    },

    async getUserByToken (token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    },

    async createRefreshJWT (deviceId: string, expirationTimeSeconds: number = 500): Promise<JWTRefreshTokenType> {
        const token = jwt.sign({deviceId: deviceId}, settings.JWT_SECRET, {expiresIn: `${expirationTimeSeconds}s`})
        const tokenTiming = {
            issueAt: new Date(),
            expirationTime: add(new Date(), {
                seconds: expirationTimeSeconds
            })
        }
        return {token: token, tokenTiming: tokenTiming}
    },

    async validateRefreshToken (token: string) {
        try {            
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.deviceId
        } catch (error) {
            return false
        }
    },
}