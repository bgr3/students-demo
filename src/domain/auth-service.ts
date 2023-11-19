import { emailManager } from "../managers/email-manager"
import { usersRepository } from "../repositories/users-repository/users-db-repository"
import { v4 as uuidv4 } from 'uuid'
import { jwtService } from "../application/jwt-service"
import { authRepository } from "../repositories/auth-repository/auth-db-repository"
import { AuthTypeOutput, DbAuthType, MeType, Tokens } from "../types/auth-types"
import { authQueryRepository } from "../repositories/auth-repository/auth-query-db-repository"




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

    async getMeByToken(token: string): Promise<MeType | null> {
        const userId = await jwtService.getUserByToken(token)
        const user = await usersRepository.findUserDbByID(userId)        

        if (!user) return null

        const me = {
            "email": user.email,
            "login": user.login,
            "userId": user._id.toString()
          }       

        return me
    },

    async createAuthSession(userId: string, deviceIP: string, deviceName: string): Promise<Tokens | null> {
        const accessToken = await jwtService.createJWT(userId)
        const deviceId = uuidv4()
        const refreshToken = await jwtService.createRefreshJWT(deviceId)
        const authSession = {
            issuedAt: refreshToken.tokenTiming.issueAt,
            expiredAt: refreshToken.tokenTiming.expirationTime,
            deviceId: deviceId,
            deviceIP: deviceIP,
            deviceName: deviceName,
            userId: userId,
            tokens: {
                accessToken: accessToken,
                refreshToken: refreshToken.token,
            }
        }

        const result = await authRepository.createAuthSession(authSession)

        if(!result) return null

        return {
            accessToken: accessToken,
            refreshToken: refreshToken.token,
        }
    },

    async updateTokens (oldRefreshToken: string): Promise<Tokens | null> {
        const deviceId = await jwtService.validateRefreshToken(oldRefreshToken)
        const oldSession = await authRepository.findAuthSessionByDeviceId(deviceId)
        const user = await usersRepository.findUserDbByID(oldSession!.userId)
        const accessToken = await jwtService.createJWT(user!._id.toString())
        const refreshToken = await jwtService.createRefreshJWT(deviceId)
        const putAuthSession = {
            issuedAt: refreshToken.tokenTiming.issueAt,
            expiredAt: refreshToken.tokenTiming.expirationTime,
            tokens: {
                accessToken: accessToken,
                refreshToken: refreshToken.token,
            }
        }

        const result = await authRepository.updateAuthSession(oldSession!.deviceId, putAuthSession)

        if(!result) return null

        return {
            accessToken: accessToken,
            refreshToken: refreshToken.token,
        }
    },

    async getAuthSessionsByToken(token: string): Promise<AuthTypeOutput[] | null> {
        const deviceId = await jwtService.validateRefreshToken(token)
        const userSession = await authRepository.findAuthSessionByDeviceId(deviceId)

        return await authQueryRepository.findAuthSessionsByUserId(userSession!.userId)
    },

    async getSingleAuthSessionByToken(token: string): Promise<DbAuthType | null> {
        const deviceId = await jwtService.validateRefreshToken(token)
        const userSession = await authRepository.findAuthSessionByDeviceId(deviceId)

        return userSession
    },

        async getAuthSessionByDeviceId(deviceId: string): Promise<DbAuthType | null> {
        const userSession = await authRepository.findAuthSessionByDeviceId(deviceId)

        return userSession
    },

    async deleteAuthSessionsExcludeCurent(token: string): Promise<boolean> {
        const deviceId = await jwtService.validateRefreshToken(token)
        const userSessions = await authRepository.findAuthSessionByDeviceId(deviceId)
        const result = await authRepository.deleteAuthSessionsByUserId(userSessions!.userId, deviceId)

        if (!result) return false

        return true
    },

    async deleteSpecifiedAuthSessionByDeviceId(deviceId: string): Promise<boolean> {
        const result = await authRepository.deleteAuthSessionByDeviceId(deviceId)
        if (!result) return false

        return true
    },

    async deleteAuthSessionByToken(token: string): Promise<boolean> {
        const deviceId = await jwtService.validateRefreshToken(token)
        const result = await authRepository.deleteAuthSessionByDeviceId(deviceId)
        if (!result) return false

        return true
    }
}