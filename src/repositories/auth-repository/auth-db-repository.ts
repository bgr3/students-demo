import { AuthModel } from "../../db/db"
import { AuthPutType, AuthType, DbAuthType } from "../../types/auth-types";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class AuthRepository {
    async testAllData (): Promise<void> {
        const result = await AuthModel.deleteMany({})
        //console.log('users delete: ', result.deletedCount)
    }

    async createAuthSession (auth: AuthType): Promise<string | null> {
        const result = await AuthModel.insertMany([auth]);
        //console.log(result.insertedId)
        if (result[0]._id) {
            return result[0]._id.toString()
        } else {
            return null
        }
    }

    async updateAuthSession (deviceId: string, putAuth: AuthPutType): Promise<boolean> {
        const result = await AuthModel.updateOne({deviceId: deviceId}, { $set: putAuth})

        if (result.matchedCount) {
            return true
        }        

        return false
    }

    async findAuthSessionByDeviceId (deviceId: string): Promise<DbAuthType | null> {
        const session = await AuthModel.findOne({deviceId: deviceId});
        return session
    }

    async findAuthSessionByAccessToken (accessToken: string): Promise<DbAuthType | null> {
        const session = await AuthModel.findOne({'tokens.accessToken': accessToken});
        return session
    }

    async deleteAuthSessionsByUserId (userId: string, deviceId: string): Promise<boolean> {
        const result = await AuthModel.deleteMany({$and: [{ userId: userId}, { deviceId: {$ne: deviceId} }] });
        
        if (!result) return false

        return true
    }

    async deleteAuthSessionByDeviceId (deviceId: string): Promise<boolean> {
        const result = await AuthModel.deleteOne({deviceId: deviceId});

        if (!result.deletedCount) return false
        
        return true
    }
}

