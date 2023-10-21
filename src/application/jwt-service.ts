import { settings } from "../settings";
import { UserDb } from "../types/user-types";
import jwt from 'jsonwebtoken'

export const jwtService = {
    async createJWT (user: UserDb) {
        const token = jwt.sign({userId: user._id.toString()}, settings.JWT_SECRET, {expiresIn: '1h'})
        return {accessToken: token}
    },

    async getUserByToken (token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    }
}