import { users } from "../db/users-db";

export const checkAuthorization = (token: string | undefined) => {
   
    for (let i = 0; i < users.length; i++){
        if (token === `Basic ${users[i].userPassword}`) {
            return true;
        }
    }
    return false    
}