import { usersCollection } from "../db/db";
import { ObjectId } from "mongodb";
import { UserDb, UserFilter, UserOutput, UserPaginatorType, UserType } from "../types/user-types";
import { Tokens } from "../types/auth-types";

export const userFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
    searchLoginTerm: '',
    searchEmailTerm: '',
  }

export const usersRepository = {
    async testAllData (): Promise<void> {
        const result = await usersCollection.deleteMany({})
        //console.log('users delete: ', result.deletedCount)
    },

    async findUsers (filter: UserFilter = userFilter): Promise<UserPaginatorType> {
        const skip = (filter.pageNumber - 1) * filter.pageSize
        const regexLogin = new RegExp(filter.searchLoginTerm, 'i')
        const regexEmail = new RegExp(filter.searchEmailTerm, 'i')
        const dbCount = await usersCollection.countDocuments({$or: [{login: RegExp(regexLogin)}, {email: RegExp(regexEmail)}]})
        const dbResult = await usersCollection.find({$or: [{login: RegExp(regexLogin)}, {email: RegExp(regexEmail)}]}).sort({[filter.sortBy]: (filter.sortDirection == 'asc' ? 1 : -1)}).skip(skip).limit(filter.pageSize).toArray()

        const paginator = {
            pagesCount: Math.ceil(dbCount / filter.pageSize),
            page: filter.pageNumber,
            pageSize: filter.pageSize,
            totalCount: dbCount,
            items: dbResult.map((p: UserDb) => userMapper(p))
        }

        return paginator
    },

    async findUserByLoginOrEmail (loginOrEmail: string): Promise<UserDb | null> {
        const dbResult = await usersCollection.findOne({$or : [{login: loginOrEmail}, {email: loginOrEmail}]})
        
        return dbResult
    },

    async findUserDbByID (id: string): Promise<UserDb | null> {
        if (ObjectId.isValid(id)) {
            const user = await usersCollection.findOne({_id: new ObjectId(id)});
            return user           
        }

        return null
    },

    async findUserByConfirmationCode (code: string): Promise<UserDb | null> {
        const dbResult = await usersCollection.findOne({'emailConfirmation.confirmationCode': code})
        
        return dbResult
    },

    async findUserByID (id: string): Promise<UserOutput | null> {
        if (ObjectId.isValid(id)) {
            const user = await usersCollection.findOne({_id: new ObjectId(id) });
            if (user) {
                return userMapper(user)                
            }
            return user
        }

        return null
    },

    async createUser (newUser: UserType): Promise<string | null> {

        const result = await usersCollection.insertOne(newUser);
        //console.log(result.insertedId)
        if (result.insertedId) {
            return result.insertedId.toString()
        } else {
            return null
        }
    },

    async updateConfirmation (userId: ObjectId): Promise<boolean> {
        const result = await usersCollection.updateOne({_id: userId}, { $set: {'emailConfirmation.isConfirmed': true}})

        if (result.matchedCount) return true

        return false
    },

    async resendConfirmationCode (userId: ObjectId, code: string): Promise<boolean> {
        const result = await usersCollection.updateOne({_id: userId}, { $set: {'emailConfirmation.confirmationCode': code}})

        if (result.matchedCount) return true


        return false
    },

    async deleteUser (id: string): Promise<Boolean> {
        if (ObjectId.isValid(id)) {

            const result = await usersCollection.deleteOne({_id: new ObjectId(id)})
            
            if (result.deletedCount) {
                return true
            }
        }
        return false
    },

    async createTokens (userId: ObjectId, tokens: Tokens[]): Promise<boolean> {
        
        const result = await usersCollection.updateOne({_id: userId}, { $set: {'JWTTokens': tokens}})

        if (!result.matchedCount) return false

        return true
    },

    async updateTokens (userId: ObjectId, oldTokens: Tokens, newTokens: Tokens): Promise<boolean> {
        const resultPull = await usersCollection.updateOne({_id: userId}, {$pull: {'JWTTokens': oldTokens}})
        const resultPush = await usersCollection.updateOne({_id: userId}, {$push: {'JWTTokens': newTokens}})

        if (!resultPull.matchedCount || !resultPush) return false

        return true
    },

    async deleteTokens (userId: ObjectId, tokens: Tokens): Promise<boolean> {
        const result = await usersCollection.updateOne({_id: userId}, { $pull: {'JWTTokens': tokens}})

        if (result.matchedCount) return true

        return false
    }
}


const userMapper = (user: UserDb): UserOutput => {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: 	user.createdAt,
    }
}