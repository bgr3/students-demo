import { jwtService } from "../application/jwt-service";
import { users } from "../db/users-db";
import { usersService } from "../domain/user-service";

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
        
        return await usersService.findUserByID(userId)
    }

    return null  
}

