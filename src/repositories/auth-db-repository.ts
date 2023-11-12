import { authCollection } from "../db/db"
import { AuthPutType, AuthType, AuthTypeOutput, DbAuthType } from "../types/auth-types";

export const   authRepository = {
    async testAllData (): Promise<void> {
        const result = await authCollection.deleteMany({})
        //console.log('users delete: ', result.deletedCount)
    },

    async createAuthSession (auth: AuthType): Promise<string | null> {
        const result = await authCollection.insertOne(auth);
        //console.log(result.insertedId)
        if (result.insertedId) {
            return result.insertedId.toString()
        } else {
            return null
        }
    },

    async updateAuthSession (deviceId: string, putAuth: AuthPutType): Promise<boolean> {
        const result = await authCollection.updateOne({deviceId: deviceId}, { $set: putAuth})

        if (result.matchedCount) {
            return true
        }        

        return false
    },

    async findAuthSessionsByUserId (userId: string): Promise<AuthTypeOutput[] | null> {
        const session = await authCollection.find({userId: userId}).toArray();
        return session.map(i => authMapper(i))
    },

    async findAuthSessionByDeviceId (deviceId: string): Promise<DbAuthType | null> {
        const session = await authCollection.findOne({deviceId: deviceId});
        return session
    },

    async findAuthSessionByAccessToken (accessToken: string): Promise<DbAuthType | null> {
        const session = await authCollection.findOne({'tokens.accessToken': accessToken});
        return session
    },

    async deleteAuthSessionsByUserId (userId: string, deviceId: string): Promise<boolean> {
        const result = await authCollection.deleteMany({$and: [{ userId: userId}, { deviceId: {$ne: deviceId} }] });
        
        if (!result) return false

        return true
    },

    async deleteAuthSessionByDeviceId (deviceId: string): Promise<boolean> {
        const result = await authCollection.deleteOne({deviceId: deviceId});

        if (!result.deletedCount) return false
        
        return true
    },
}

const authMapper = (session: DbAuthType): AuthTypeOutput => {
    return {
        ip: session.deviceIP,
        title: session.deviceName,
        lastActiveDate: session.issuedAt.toISOString(),
        deviceId: session.deviceId
    }
}