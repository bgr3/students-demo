import { emailManager } from "../managers/email-manager"
import { usersRepository } from "../repositories/users-db-repository"

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

    async ReSendEmail(email: string): Promise<boolean> {
        let user = await usersRepository.findUserByLoginOrEmail(email)

        if (!user) return false

        await emailManager.sendRegistrationEmail(user.emailConfirmation.confirmationCode, user.email)

        return true
    }
}