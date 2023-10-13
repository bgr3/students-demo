import { BlogDb, BlogFilter, BlogOutput, BlogPaginatorType, BlogPutType, BlogType } from "../types/blog-types";
import { usersCollection } from "../db/db";
import { ObjectId } from "mongodb";
import { UserDb, UserFilter, UserOutput, UserPaginatorType, UserType } from "../types/user-types";

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
        console.log('users delete: ', result.deletedCount)
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
        console.log(result.insertedId)
        if (result.insertedId) {
            return result.insertedId.toString()
        } else {
            return null
        }
    },

    async deleteUser (id: string): Promise<Boolean> {
        if (ObjectId.isValid(id)) {

            const result = await usersCollection.deleteOne({_id: new ObjectId(id)})
            
            if (result.deletedCount) {
                return true
            }
        }
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