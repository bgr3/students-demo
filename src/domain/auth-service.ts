import { emailManager } from "../managers/email-manager"
import { usersRepository } from "../repositories/users-db-repository"
import { v4 as uuidv4 } from 'uuid'
import { UserDb } from "../types/user-types"
import { jwtService } from "../application/jwt-service"

export const authService = {
    async sendEmail (email: string, subject?: string, message?: string, html?: string) {
        return emailManager.sendEmail(email, subject, message, html)
    },
    
    async confirmEmail(code: string): Promise<boolean> {
        let user = await usersRepository.findUserByConfirmationCode(code)
        let result = await usersRepository.updateConfirmation(user!._id)

        return result
    },

    async registerUserSendEmail(id: string): Promise<boolean> {
        let user = await usersRepository.findUserDbByID(id)

        if (!user) return false

        await emailManager.sendRegistrationEmail(user.emailConfirmation.confirmationCode, user.email)

        return true
    },

    async ReSendEmail (email: string): Promise<boolean> {
        const user = await usersRepository.findUserByLoginOrEmail(email)

        if (!user) return false

        const code = uuidv4()

        let result = await usersRepository.resendConfirmationCode(user._id, code)

        if (!result) return false        

        await emailManager.sendRegistrationEmail(code, user.email)

        return true
    },

    async saveTokens (user: UserDb, acsessToken: string, refreshToken: string): Promise<boolean> {
        const verifyedTokens = user.JWTTokens.filter(async i => await jwtService.validateRefreshToken(i.refreshToken))
        const newTokens = {
            accessToken: acsessToken,
            refreshToken: refreshToken
        }

        verifyedTokens.push(newTokens)

        const result = await usersRepository.createTokens(user._id, verifyedTokens)

        if (!result) return false

        return true
    },

    async updateTokens (user: UserDb, oldRefreshToken: string, newAccessToken: string, newRefreshToken: string): Promise<Boolean> {
        const oldTokens = {
            accessToken: user.JWTTokens.find(i => i.refreshToken == oldRefreshToken)!.accessToken,
            refreshToken: oldRefreshToken            
        }

        const newTokens = {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken            
        }
        const result = await usersRepository.updateTokens(user._id, oldTokens, newTokens)

        if(!result) return false

        return true
    },

    async deleteTokens (user: UserDb, oldRefreshToken: string): Promise<Boolean> {
        const oldTokens = {
            accessToken: user.JWTTokens.find(i => i.refreshToken == oldRefreshToken)!.accessToken,
            refreshToken: oldRefreshToken            
        }

        const result = await usersRepository.deleteTokens(user._id, oldTokens)

        if(!result) return false

        return true
    }
}