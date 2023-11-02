import { usersRepository } from "../repositories/users-db-repository"
import { UserDb, UserOutput, UserPaginatorType } from "../types/user-types"
import  bcrypt  from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import add from 'date-fns/add'



export const usersService = {
    async testAllData (): Promise<void> {
        return usersRepository.testAllData()
    },

    async findUsers (filterService?:any): Promise<UserPaginatorType> {
        const blogs = await usersRepository.findUsers(filterService)

        return blogs
    },

    async findUserByID (id: string): Promise<UserOutput|null> {
        const user = await usersRepository.findUserByID(id)

        return user
    },

    async findUserDbByID (id: string): Promise<UserDb|null> {
        let user = await usersRepository.findUserDbByID(id)

        return user
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<UserDb | null> {
        const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail)
        
        if (!user) return null
        
        const passwordSalt = await this._getSalt(user.password)
        const passwordHash = await this._generateHash(password, passwordSalt)
        
        if (passwordHash !== user.password) {
            return null
        }

        return user
    },

    async createUser (login: string, email: string, password: string, isSuperAdmin: boolean = false): Promise<string | null> {     
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser = {
            login: login,
            password: passwordHash,
            email: email,
            createdAt: new Date().toISOString(),
            emailConfirmation : {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    minutes: 5
                }),
                isConfirmed: isSuperAdmin,
                nextSend: add(new Date(), {
                    seconds: 0
                }),
            },
            JWTTokens: []
        };
        
        return await usersRepository.createUser(newUser)
    },

    async deleteUser (id: string): Promise<Boolean> {
        return usersRepository.deleteUser(id)
    },

    async _generateHash (password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)

        return hash
    },

    async _getSalt (password: string) {
        const salt = password.match(/\$..\$..\$.{22}/g)
        
        if (salt) {
            return salt[0]
        }
        return ''
    }
}
