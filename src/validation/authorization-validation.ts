import { injectable } from "inversify";
import { jwtService } from "../application/jwt-service";
import { users } from "../db/users-db";
import { UsersService } from "../domain/user-service";
import { container } from "../ioc-containers/ioc-container";
import { UserDb } from "../types/user-types";
import "reflect-metadata";

export const checkAuthorization = (token: string | undefined) => {
    if (!token) {
        return false
    }
    
    for (let i = 0; i < users.length; i++){

        if (token === `Basic ${users[i].userPassword}`) {
            return true;
        }
    }

    return false   
}

export const checkJWTAuthorization = async (token: string | undefined) => {
    if (!token) { 
        return false
    }

    const tokenSplit = token.split(' ')
    const tokenJWT = tokenSplit[1]
    const userId = await jwtService.getUserByToken(tokenJWT)
    const tokenType = tokenSplit[0]

    if (userId && tokenType === 'Bearer') {
        
        return tokenJWT
    }

    return null  
}

@injectable()
export class AuthorizationValidation { 
    constructor(protected usersService: UsersService){}
    async getUserByJWTAccessToken(token: string | undefined): Promise<UserDb | null>  {
        if (!token) return null
        const tokenSplit = token.split(' ')
        const tokenJWT = tokenSplit[1]
        const userId = await jwtService.getUserByToken(tokenJWT)
        const user = await this.usersService.findUserDbByID(userId)

        return user
    }
}
