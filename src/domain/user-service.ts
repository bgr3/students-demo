import { usersRepository } from "../repositories/users-db-repository"
import { UserOutput, UserPaginatorType } from "../types/user-types"
import  bcrypt  from 'bcrypt'



export const usersService = {
    async testAllData (): Promise<void> {
        return usersRepository.testAllData()
    },

    async findUsers (filterService?:any): Promise<UserPaginatorType> {
        const blogs = await usersRepository.findUsers(filterService)

        return blogs
    },

    async findUserByID (id: string): Promise<UserOutput| null> {
        const user = await usersRepository.findUserByID(id)

        return user
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<boolean> {
        const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail)
        
        if (!user) return false
        
        const passwordSalt = await this._getSalt(user.password)
        const passwordHash = await this._generateHash(password, passwordSalt)
        
        if (passwordHash !== user.password) {
            return false
        }

        return true
    },

    async createUser (login: string, email: string, password: string): Promise<string | null> {     
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser = {
            login: login,
            password: passwordHash,
            email: email,
            createdAt: new Date().toISOString(),
        };

        console.log(passwordHash, passwordSalt)
        
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
        const salt = password.match(/\$..\$..\$.{22}/)
        console.log(password, salt)
        if (salt) {
            return salt.toString()
        }
        return ''
    }
}
