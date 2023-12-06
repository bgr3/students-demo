import { ObjectId } from "mongodb";
import { UserDb, UserType } from "../../types/user-types";
import { Tokens } from "../../types/auth-types";
import { UserModel } from "../../db/db";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class UsersRepository {
    async testAllData (): Promise<void> {
        const result = await UserModel.deleteMany({})
        //console.log('users delete: ', result.deletedCount)
    }

    async findUserByLoginOrEmail (loginOrEmail: string): Promise<UserDb | null> {
        const dbResult = await UserModel.findOne({$or : [{login: loginOrEmail}, {email: loginOrEmail}]}).lean()
        
        return dbResult
    }

    async findUserDbByID (id: string): Promise<UserDb | null> {
        if (ObjectId.isValid(id)) {
            const user = await UserModel.findOne({_id: new ObjectId(id)}).lean();
            return user           
        }

        return null
    }

    async findUserByConfirmationCode (code: string): Promise<UserDb | null> {
        const dbResult = await UserModel.findOne({'emailConfirmation.confirmationCode': code}).lean()
        
        return dbResult
    }

    async createUser (newUser: UserType): Promise<string | null> {

        const result = await UserModel.insertMany([newUser]);
        if (result[0]._id) {
            return result[0]._id.toString()
        } else {
            return null
        }
    }

    async updateConfirmation (userId: ObjectId): Promise<boolean> {
        const result = await UserModel.updateOne({_id: userId}, { $set: {'emailConfirmation.isConfirmed': true}})

        if (result.matchedCount) return true

        return false
    }

    async resendConfirmationCode (userId: ObjectId, code: string): Promise<boolean> {
        const result = await UserModel.updateOne({_id: userId}, { $set: {'emailConfirmation.confirmationCode': code}})

        if (result.matchedCount) return true


        return false
    }

    async updateConfirmationCode (email: string, code: string, expirationDate: object): Promise<boolean> {
        const result = await UserModel.updateOne({email: email}, { $set: {'emailConfirmation.confirmationCode': code}}, {$set: {'emailConfirmation.expirationDate': expirationDate}})

        if (result.matchedCount) return true

        return false
    }

    async updatePassword (userId: ObjectId, password: string): Promise<boolean> {
        const result = await UserModel.updateOne({_id: userId}, { $set: {'password': password}})

        if (result.matchedCount) return true

        return false
    }

    async deleteUser (id: string): Promise<Boolean> {
        if (ObjectId.isValid(id)) {

            const result = await UserModel.deleteOne({_id: new ObjectId(id)})
            
            if (result.deletedCount) {
                return true
            }
        }
        return false
    }

    async createTokens (userId: ObjectId, tokens: Tokens[]): Promise<boolean> {
        
        const result = await UserModel.updateOne({_id: userId}, { $set: {'JWTTokens': tokens}})

        if (!result.matchedCount) return false

        return true
    }

    async updateTokens (userId: ObjectId, oldTokens: Tokens, newTokens: Tokens): Promise<boolean> {
        const resultPull = await UserModel.updateOne({_id: userId}, {$pull: {'JWTTokens': oldTokens}})
        const resultPush = await UserModel.updateOne({_id: userId}, {$push: {'JWTTokens': newTokens}})

        if (!resultPull.matchedCount || !resultPush) return false

        return true
    }

    async deleteTokens (userId: ObjectId, tokens: Tokens): Promise<boolean> {
        const result = await UserModel.updateOne({_id: userId}, { $pull: {'JWTTokens': tokens}})

        if (result.matchedCount) return true

        return false
    }

}

