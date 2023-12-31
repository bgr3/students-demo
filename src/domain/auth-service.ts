import { emailManager } from "../managers/email-manager"
import { UsersRepository } from "../repositories/users-repository/users-db-repository"
import { v4 as uuidv4 } from 'uuid'
import { jwtService } from "../application/jwt-service"
import { AuthRepository } from "../repositories/auth-repository/auth-db-repository"
import { AuthPutType, AuthType, AuthTypeOutput, DbAuthType, MeType, Tokens } from "../types/auth-types"
import { AuthQueryRepository } from "../repositories/auth-repository/auth-query-db-repository"
import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
export class AuthService {
    constructor(
        protected authRepository: AuthRepository,
        protected authQueryRepository: AuthQueryRepository,
        protected usersRepository: UsersRepository
    ){}
    async testAllData (): Promise<void> {
        return this.authRepository.testAllData()
    }
    async sendEmail (email: string, subject?: string, message?: string, html?: string) {
        return emailManager.sendEmail(email, subject, message, html)
    }
    
    async confirmEmail(code: string): Promise<boolean> {
        let user = await this.usersRepository.findUserByConfirmationCode(code)
        let result = await this.usersRepository.updateConfirmation(user!._id)

        return result
    }

    async registerUserSendEmail(id: string): Promise<boolean> {
        let user = await this.usersRepository.findUserDbByID(id)

        if (!user) return false

        await emailManager.sendRegistrationEmail(user.emailConfirmation.confirmationCode, user.email)

        return true
    }

    async changePasswordEmail(id: string): Promise<boolean> {
        let user = await this.usersRepository.findUserDbByID(id);

        if (!user) return false

        console.log(user.emailConfirmation.confirmationCode);
        

        await emailManager.sendRecoveryPasswordEmail(user.emailConfirmation.confirmationCode, user.email)

        return true
    }

    async ReSendEmail (email: string): Promise<boolean> {
        const user = await this.usersRepository.findUserByLoginOrEmail(email)

        if (!user) return false

        const code = uuidv4()

        let result = await this.usersRepository.resendConfirmationCode(user._id, code)

        if (!result) return false        

        await emailManager.sendRegistrationEmail(code, user.email)

        return true
    }

    async getMeByToken(token: string): Promise<MeType | null> {
        const userId = await jwtService.getUserByToken(token)
        const user = await this.usersRepository.findUserDbByID(userId)        

        if (!user) return null

        const me = new MeType(
            user.email,
            user.login,
            user._id.toString()
        ) 

        return me
    }

    async createAuthSession(userId: string, deviceIP: string, deviceName: string): Promise<Tokens | null> {
        const accessToken = await jwtService.createJWT(userId)
        const deviceId = uuidv4()
        const refreshToken = await jwtService.createRefreshJWT(deviceId)
        const authSession = new AuthType(
            refreshToken.tokenTiming.issueAt, 
            refreshToken.tokenTiming.expirationTime,
            deviceId,
            deviceIP,
            deviceName,
            userId,
            {
                accessToken: accessToken,
                refreshToken: refreshToken.token,
            }
        )

        const result = await this.authRepository.createAuthSession(authSession)

        if(!result) return null

        return {
            accessToken: accessToken,
            refreshToken: refreshToken.token,
        }
    }

    async updateTokens (oldRefreshToken: string): Promise<Tokens | null> {
        const deviceId = await jwtService.validateRefreshToken(oldRefreshToken)
        const oldSession = await this.authRepository.findAuthSessionByDeviceId(deviceId)
        const user = await this.usersRepository.findUserDbByID(oldSession!.userId)
        const accessToken = await jwtService.createJWT(user!._id.toString())
        const refreshToken = await jwtService.createRefreshJWT(deviceId)
        const putAuthSession = new AuthPutType(
            refreshToken.tokenTiming.issueAt,
            refreshToken.tokenTiming.expirationTime,
            {
                accessToken: accessToken,
                refreshToken: refreshToken.token,
            }
        )
    

        const result = await this.authRepository.updateAuthSession(oldSession!.deviceId, putAuthSession)

        if(!result) return null

        return {
            accessToken: accessToken,
            refreshToken: refreshToken.token,
        }
    }

    async getAuthSessionsByToken(token: string): Promise<AuthTypeOutput[] | null> {
        const deviceId = await jwtService.validateRefreshToken(token)
        const userSession = await this.authRepository.findAuthSessionByDeviceId(deviceId)

        return await this.authQueryRepository.findAuthSessionsByUserId(userSession!.userId)
    }

    async getSingleAuthSessionByToken(token: string): Promise<DbAuthType | null> {
        const deviceId = await jwtService.validateRefreshToken(token)
        const userSession = await this.authRepository.findAuthSessionByDeviceId(deviceId)

        return userSession
    }

        async getAuthSessionByDeviceId(deviceId: string): Promise<DbAuthType | null> {
        const userSession = await this.authRepository.findAuthSessionByDeviceId(deviceId)

        return userSession
    }

    async deleteAuthSessionsExcludeCurent(token: string): Promise<boolean> {
        const deviceId = await jwtService.validateRefreshToken(token)
        const userSessions = await this.authRepository.findAuthSessionByDeviceId(deviceId)
        const result = await this.authRepository.deleteAuthSessionsByUserId(userSessions!.userId, deviceId)

        if (!result) return false

        return true
    }

    async deleteSpecifiedAuthSessionByDeviceId(deviceId: string): Promise<boolean> {
        const result = await this.authRepository.deleteAuthSessionByDeviceId(deviceId)
        if (!result) return false

        return true
    }

    async deleteAuthSessionByToken(token: string): Promise<boolean> {
        const deviceId = await jwtService.validateRefreshToken(token)
        const result = await this.authRepository.deleteAuthSessionByDeviceId(deviceId)
        if (!result) return false

        return true
    }
}
