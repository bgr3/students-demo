import { ObjectId } from "mongodb";
import { UserDb, UserFilterType, UserOutput, UserPaginatorType } from "../../types/user-types";
import { UserModel } from "../../db/db";

export const userFilter = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc',
    searchLoginTerm: '',
    searchEmailTerm: '',
  }

export class UsersQueryRepository {
    async findUsers (filter: UserFilterType = userFilter): Promise<UserPaginatorType> {
        const skip = (filter.pageNumber - 1) * filter.pageSize
        const regexLogin = new RegExp(filter.searchLoginTerm, 'i')
        const regexEmail = new RegExp(filter.searchEmailTerm, 'i')
        const dbCount = await UserModel.countDocuments({$or: [{login: RegExp(regexLogin)}, {email: RegExp(regexEmail)}]})
        const dbResult = await UserModel.find({$or: [{login: RegExp(regexLogin)}, {email: RegExp(regexEmail)}]}).sort({[filter.sortBy]: (filter.sortDirection == 'asc' ? 1 : -1)}).skip(skip).limit(filter.pageSize).lean()
        debugger

        const paginator = {
            pagesCount: Math.ceil(dbCount / filter.pageSize),
            page: filter.pageNumber,
            pageSize: filter.pageSize,
            totalCount: dbCount,
            items: dbResult.map((p: UserDb) => userMapper(p))
        }

        return paginator
    }
    
    async findUserByID (id: string): Promise<UserOutput | null> {
        if (ObjectId.isValid(id)) {
            const user = await UserModel.findOne({_id: new ObjectId(id) }).lean();

            if (user) {
                return userMapper(user)                
            }
            return user
        }

        return null
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