import { ObjectId } from "mongodb";
import { jwtService } from "../application/jwt-service";
import { users } from "../db/users-db";
import { UsersService } from "../domain/user-service";
import { container } from "../ioc-containers/ioc-container";
import { UserDb } from "../types/user-types";
import { injectable } from "inversify";



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
export class GetUserByJWTAccessToken {
    async getUserByJWTAccessToken(token: string | undefined): Promise<UserDb | null> {
        const usersService = container.get(UsersService)
        if (!token) return null
        const tokenSplit = token.split(' ')
        const tokenJWT = tokenSplit[1]
        const userId = await jwtService.getUserByToken(tokenJWT)
        const user = await usersService.findUserDbByID(userId)
        // const user = {_id: new ObjectId('123'), 
        //     login: 'string',
        //     email: 'string',
        //     password: 'string',
        //     createdAt: 'string',
        //     emailConfirmation : {
        //         confirmationCode: 'string',
        //         expirationDate: new Date(),
        //         isConfirmed: true,
        //         nextSend: new Date()
        //     },
        //     JWTTokens: []}

        return user
    }
}