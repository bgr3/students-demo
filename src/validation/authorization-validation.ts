import { jwtService } from "../application/jwt-service";
import { users } from "../db/users-db";
import { usersService } from "../domain/user-service";
import { UserDb } from "../types/user-types";

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

export const getUserByJWTAccessToken = async (token: string | undefined): Promise<UserDb | null> => {
    if (!token) return null
    const tokenSplit = token.split(' ')
    const tokenJWT = tokenSplit[1]
    const userId = await jwtService.getUserByToken(tokenJWT)
    const user = await usersService.findUserDbByID(userId)

    return user
}

